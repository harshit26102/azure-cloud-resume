# Azure Cloud Resume Challenge ☁️

A serverless resume website built on Microsoft Azure with a real-time visitor counter.

🌐 **Live Demo:** https://rgresume.z29.web.core.windows.net/

---

## 🚀 Project Overview

This project is my implementation of the Cloud Resume Challenge using Microsoft Azure.

The website hosts my resume as a static website and uses a serverless backend to track the number of visitors. The backend is secured using Azure Managed Identity and Cosmos DB role-based access rather than storing a database key in the application code.

The project was built and deployed hands-on using the Azure Portal, Azure Functions Core Tools, Azure CLI, JavaScript, and Git/GitHub.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       Visitor        │
                    └──────────┬───────────┘
                               │
                               ▼
                 ┌─────────────────────────┐
                 │ Azure Storage Static     │
                 │ Website                 │
                 │ HTML / CSS / JavaScript │
                 └───────────┬─────────────┘
                             │
                         HTTPS API
                             │
                             ▼
                 ┌─────────────────────────┐
                 │ Azure API Management    │
                 └───────────┬─────────────┘
                             │
                             ▼
                 ┌─────────────────────────┐
                 │ Azure Functions         │
                 │ visitorCounter          │
                 │ HTTP Trigger            │
                 └───────────┬─────────────┘
                             │
                  Managed Identity / RBAC
                             │
                             ▼
                 ┌─────────────────────────┐
                 │ Azure Cosmos DB         │
                 │ ResumeDB / Visitors     │
                 └─────────────────────────┘

                         ┌──────────────────┐
                         │ Application      │
                         │ Insights         │
                         │ Monitoring       │
                         └────────▲─────────┘
                                  │
                              Telemetry
                                  │
                              Function

Azure Services Used
| Service                      | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| Azure Storage Static Website | Hosts the resume frontend                              |
| Azure API Management         | Exposes and manages the visitor counter API            |
| Azure Functions              | Serverless backend/API                                 |
| Azure Cosmos DB for NoSQL    | Stores the visitor count                               |
| Azure Managed Identity       | Passwordless authentication from Function to Cosmos DB |
| Azure RBAC                   | Controls Cosmos DB data access                         |
| Application Insights         | Application monitoring and telemetry                   |
| Azure CLI                    | Deployment and cloud management                        |
| Azure Functions Core Tools   | Local development and deployment                       |

Visitor Counter Flow
When a visitor opens the website:

The static website loads the HTML, CSS and JavaScript.
script.js sends an HTTPS request to the API.
Azure API Management receives the request.
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
Updated visitor count
   ↓
Website

Project Structure
azure-cloud-resume/
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

Technologies
HTML5
CSS3
JavaScript
Node.js
Azure Functions
Azure Storage
Azure API Management
Azure Cosmos DB for NoSQL
Azure Managed Identity
Azure RBAC
Application Insights
Azure CLI
Git
GitHub

Testing
The application was tested end-to-end using the live Azure deployment.

The visitor counter successfully increments through:
Live Website
     ↓
API Management
     ↓
Azure Function
     ↓
Managed Identity
     ↓
Cosmos DB

Azure Front Door & DNS

Azure Front Door was evaluated as the Azure equivalent of AWS CloudFront.

However, the Azure Free Trial/Student subscription used for this project does not permit Azure Front Door resources.

Therefore, Front Door was not deployed and no subscription upgrade was performed just to enable it.

Azure DNS was also not configured because a custom domain was not available for the project.

The core application remains fully functional without these components.

Challenges & Solutions
1. Azure Functions deployment

The Function initially encountered deployment and entry-point issues.

Solution: The project structure and Node.js entry point were corrected, followed by deployment using Azure Functions Core Tools.

2. API integration

The frontend initially called the Function directly.

Solution: Azure API Management was introduced between the frontend and Function to provide an API management layer.

3. CORS

The browser initially blocked requests from the static website.

Solution: The static website origin was added to the Function App's CORS configuration.

4. Cosmos DB security

The initial implementation used a Cosmos DB key.

Solution: The Function was migrated to System-Assigned Managed Identity and Cosmos DB data-plane RBAC.

5. Subscription limitations

Azure Front Door could not be deployed because of the Free Trial/Student subscription restriction.

Solution: The service was documented as an unavailable architectural component rather than upgrading the subscription.

📊 Results
✅ Live Azure resume website
✅ Serverless visitor counter
✅ API Management integration
✅ Cosmos DB persistence
✅ Managed Identity authentication
✅ RBAC-based authorization
✅ Application monitoring
✅ GitHub source control
✅ End-to-end cloud deployment
🔮 Future Improvements

Possible future improvements include:

Custom domain
Azure Front Door/CDN when an eligible subscription is available
CI/CD using GitHub Actions
Infrastructure as Code using Bicep or Terraform
Automated testing
Custom monitoring dashboards
Custom domain HTTPS configuration

📌 What I Learned

This project helped me gain practical experience with:

Deploying applications on Microsoft Azure
Serverless application architecture
Azure Functions
REST API management
NoSQL databases
Managed Identity
Azure RBAC
Application monitoring
Cloud troubleshooting
Azure CLI
Git and GitHub
Real-world cloud deployment and security

🌐 Live Demo

Resume Website:
https://rgresume.z29.web.core.windows.net/

👨‍💻 Author

Harshit Sharma

Built with curiosity. Deployed with Azure. Always learning. ☁️
