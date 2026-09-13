const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");
const { DefaultAzureCredential } = require("@azure/identity");

app.http("visitorCounter", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {
        try {
            const endpoint = process.env.CosmosDbEndpoint;

            if (!endpoint) {
                context.error("Cosmos DB endpoint is missing.");

                return {
                    status: 500,
                    jsonBody: {
                        error: "Cosmos DB configuration is missing."
                    }
                };
            }

            // Authenticate using the Function App's Managed Identity
            const credential = new DefaultAzureCredential();

            const client = new CosmosClient({
                endpoint,
                aadCredentials: credential
            });

            const database = client.database("ResumeDB");
            const container = database.container("Visitors");

            const itemId = "visitor-counter";

            const response = await container
                .item(itemId, itemId)
                .patch([
                    {
                        op: "incr",
                        path: "/count",
                        value: 1
                    }
                ]);

            const updatedItem = response.resource;

            return {
                status: 200,
                jsonBody: {
                    count: updatedItem.count
                }
            };

        } catch (error) {
            context.error("Cosmos DB error:", error);

            return {
                status: 500,
                jsonBody: {
                    error: "Unable to update visitor count."
                }
            };
        }
    }
});