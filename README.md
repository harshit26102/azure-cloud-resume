# Azure Cloud Resume Challenge ☁️

[![CI/CD](https://github.com/harshit26102/azure-cloud-resume/actions/workflows/main_rg-resume.yml/badge.svg)](https://github.com/harshit26102/azure-cloud-resume/actions/workflows/main_rg-resume.yml)

A serverless resume website built on Microsoft Azure with a visitor counter, API Management, Azure Functions, Cosmos DB, Managed Identity, Application Insights, and GitHub Actions CI/CD.

🌐 **Live Demo:** https://rgresume.z29.web.core.windows.net/

📦 **GitHub:** https://github.com/harshit26102/azure-cloud-resume

---

## 📌 Project Overview

This project is my implementation of the Cloud Resume Challenge using Microsoft Azure.

The frontend is hosted as an Azure Storage Static Website. A JavaScript client calls an API exposed through Azure API Management. The API invokes an Azure Function, which updates a visitor counter stored in Azure Cosmos DB for NoSQL.

The Function App uses a **System-Assigned Managed Identity** and a **Cosmos DB built-in data-plane role** instead of storing a Cosmos DB key in application code.

The backend is automatically built and deployed through **GitHub Actions CI/CD** whenever changes are pushed to the `main` branch.

---

## 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │     Visitor      │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ Azure Storage Static      │
                    │ Website                  │
                    │ HTML / CSS / JavaScript  │
                    └────────────┬─────────────┘
                                 │
                              HTTPS
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Azure API Management     │
                    │ Visitor Counter API      │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Azure Functions           │
                    │ visitorCounter            │
                    │ HTTP Trigger              │
                    └────────────┬─────────────┘
                                 │
                         Managed Identity
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Azure Cosmos DB           │
                    │ ResumeDB / Visitors      │
                    └──────────────────────────┘


        ┌──────────────────────────────┐
        │       Application Insights   │
        │       Monitoring / Telemetry │
        └──────────────▲───────────────┘
                       │
                    Function
☁️ Azure Services Used
Azure Service	Purpose
Azure Storage Static Website	Hosts the resume frontend
Azure API Management	Exposes and manages the visitor counter API
Azure Functions	Serverless backend
Azure Cosmos DB for NoSQL	Stores the visitor count
Managed Identity	Passwordless authentication from Function to Cosmos DB
Cosmos DB Data-Plane RBAC	Authorizes the Function to access the container
Application Insights	Monitoring and telemetry
GitHub Actions	CI/CD automation
Azure CLI	Cloud management and deployment
Azure Functions Core Tools	Local development and deployment
🔄 Visitor Counter Flow

When a visitor opens the website:

Azure Storage serves the HTML, CSS and JavaScript.
script.js sends an HTTPS request to Azure API Management.
API Management forwards the request to the Azure Function.
The Function authenticates with Cosmos DB using its System-Assigned Managed Identity.
Cosmos DB increments the visitor counter.
The updated count is returned through the Function and API Management.
JavaScript displays the updated count on the website.
Website
   ↓
API Management
   ↓
Azure Function
   ↓
Managed Identity
   ↓
Cosmos DB
   ↓
Updated Count
   ↓
Website
🔐 Security

The project was initially implemented using a Cosmos DB key for authentication.

The backend was later migrated to System-Assigned Managed Identity.

The Function App receives an Azure-managed identity and uses Azure Identity authentication to connect to Cosmos DB.

The Function's identity was granted:

Cosmos DB Built-in Data Contributor

at the required database/container scope.

This provides:

No Cosmos DB key in application code
No database password stored in GitHub
Secretless authentication between Azure services
Least-privilege access at the Cosmos DB data-plane level

Sensitive local configuration such as:

backend/local.settings.json
backend/node_modules/

is excluded using .gitignore.

🚀 CI/CD with GitHub Actions

The backend is deployed automatically using GitHub Actions.

Developer
    │
    │ git push
    ▼
GitHub main branch
    │
    ▼
GitHub Actions
    │
    ├── Build
    │
    └── Deploy
    │
    ▼
Azure Function App

The workflow:

Detects a push to main.
Checks out the repository.
Installs the Node.js dependencies from the backend project.
Builds the deployment package.
Authenticates with Azure using OIDC.
Deploys the backend to the Azure Function App.

The deployment workflow uses OIDC-based authentication rather than storing an Azure publish profile in GitHub.

📁 Project Structure
azure-cloud-resume/
│
├── .github/
│   └── workflows/
│       └── main_rg-resume.yml
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── 404.html
│
├── backend/
│   ├── .funcignore
│   ├── host.json
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── src/
│       ├── index.js
│       └── functions/
│           └── visitorCounter.js
│
├── .gitignore
└── README.md
🧰 Technologies
Frontend
HTML5
CSS3
JavaScript
Backend
Node.js
Azure Functions
Azure API Management
Azure Cosmos DB for NoSQL
Cloud & Security
Azure Storage
Managed Identity
Cosmos DB Data-Plane RBAC
Application Insights
DevOps
Git
GitHub
GitHub Actions
Azure CLI
Azure Functions Core Tools
🧪 Testing

The application was tested end-to-end using the live Azure deployment.

The visitor counter successfully follows this path:

Live Website
     ↓
API Management
     ↓
Azure Function
     ↓
Managed Identity
     ↓
Cosmos DB
     ↓
Updated Visitor Count

The GitHub Actions pipeline was also tested by pushing changes to the main branch.

The workflow successfully completed both:

Build ✅
Deploy ✅

The live website continued to update the visitor counter after deployment.

🛠️ Challenges & Solutions
1. Azure Functions deployment

The Function initially encountered deployment and entry-point issues.

Solution:
The Node.js project structure and entry point were corrected, followed by deployment using Azure Functions Core Tools.

2. API integration

The frontend initially called the Function directly.

Solution:
Azure API Management was introduced between the frontend and Function to provide an API management layer.

3. CORS

The browser initially blocked requests from the static website.

Solution:
The static website origin was added to the Function App CORS configuration.

4. Cosmos DB authentication

The initial implementation used a Cosmos DB key.

Solution:
The Function was migrated to System-Assigned Managed Identity with a Cosmos DB built-in data-plane role.

5. GitHub Actions project path

The initial generated workflow attempted to run npm from the repository root even though the Function project was inside backend/.

Solution:
The workflow was configured to use the backend directory as the Function App project path.

6. Subscription limitations

Azure Front Door could not be deployed because the Azure Free Trial/Student subscription used for this project does not permit Azure Front Door resources.

Solution:
The core application was completed without Front Door rather than upgrading the subscription solely for this component.

⚠️ Current Limitations
Azure Front Door

Azure Front Door was evaluated as the Azure equivalent of AWS CloudFront.

It was not deployed because the subscription used for this project does not permit Azure Front Door resources.

Azure DNS

Azure DNS was not configured because a custom domain was not available for the project.

The application remains fully functional using the Azure Storage static website endpoint.

📊 Results
✅ Live Azure resume website
✅ Serverless visitor counter
✅ Azure API Management integration
✅ Cosmos DB persistence
✅ Managed Identity authentication
✅ Cosmos DB data-plane authorization
✅ Application monitoring
✅ GitHub source control
✅ GitHub Actions CI/CD
✅ OIDC-based Azure authentication
✅ End-to-end cloud deployment
🔮 Future Improvements

Possible future improvements include:

Custom domain
Azure Front Door/CDN when an eligible subscription is available
Frontend CI/CD for Azure Storage
Infrastructure as Code using Bicep or Terraform
Automated unit/integration testing
Custom Application Insights dashboards
Additional API security policies
Performance and cost optimization
📚 What I Learned

This project gave me practical experience with:

Designing a serverless cloud architecture
Deploying static websites on Azure
Azure Functions and HTTP APIs
API Management
NoSQL databases
Managed Identity
Cosmos DB data-plane authorization
Application monitoring
CORS configuration
Git and GitHub
GitHub Actions CI/CD
OIDC authentication
Azure CLI
Azure Functions Core Tools
Cloud troubleshooting
Secure cloud deployment
🌐 Live Demo

Resume Website:
https://rgresume.z29.web.core.windows.net/

GitHub Repository:
https://github.com/harshit26102/azure-cloud-resume

👨‍💻 Author

Harshit Sharma

Built with curiosity. Deployed with Azure. Always learning. ☁️
