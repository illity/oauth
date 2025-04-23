## Microsoft Entra (formerly Azure AD)

* **Client Secret Expiration** :
* **As of April 2021, the option to set client secrets to 'Never Expire' was removed.**
* **The maximum expiration period for client secrets is now 24 months.**
* **Microsoft recommends rotating client secrets every 6 months to enhance security.**
* **While the portal enforces a 2-year maximum, it's technically possible to create secrets with longer lifespans (e.g., 99 years) using PowerShell, though this is discouraged.**
* References:
  * [Client Secret Expiration Now Limited to a Maximum of Two Years](https://devblogs.microsoft.com/microsoft365dev/client-secret-expiration-now-limited-to-a-maximum-of-two-years/)
  * [Create Unlimited Client Secret in Microsoft Entra ID](https://o365info.com/create-unlimited-client-secret/)
* **Inactivation and Rotation** :
* **Client secrets cannot be inactivated; instead, a new secret must be created, and the old one deleted.**
* **Rotation involves generating a new secret and updating applications accordingly.**
* **Automation of secret rotation can be achieved using tools like Azure Key Vault and scripting.**
* Reference:
  * [Renew Client Secret in Microsoft Entra ID](https://www.alitajran.com/renew-client-secret/)

---

## 🔑 Okta

* **Client Secret Expiration** :
* **Okta does not enforce automatic expiration of client secrets.**
* **Secrets remain valid indefinitely unless manually rotated or deleted.**
* **It's recommended to rotate secrets periodically to comply with security best practices.**
* Reference:
  * [How Often Do We Need to Update the Client Secret?](https://devforum.okta.com/t/how-often-do-we-need-to-update-the-client-secret/11475)
* **Inactivation and Rotation** :
* **Okta allows up to two active client secrets per application, facilitating seamless rotation without downtime.**
* **The rotation process involves:**
  1. Generating a new secret while the old one remains active.
  2. Updating your application to use the new secret.
  3. Once confirmed, deactivating and deleting the old secret.
* Reference:
  * [Client Secret Rotation and Key Management](https://developer.okta.com/docs/guides/client-secret-rotation-key/main/)

---

## 🧭 Amazon Cognito

* **Client Secret Expiration** :
* **Cognito does not enforce expiration of client secrets; administrators must manage rotation manually.**
* **There is no built-in mechanism for automatic expiration or rotation of client secrets.**
* Reference:
  * [User Pool App Clients (Client Secrets)](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html)
* **Inactivation and Rotation** :
* **To rotate a client secret, you need to create a new app client with a new secret and update your application accordingly.**
* **The old client secret remains valid until the app client is deleted.**[Microsoft for Developers**+1**o365info.com**+1**](https://devblogs.microsoft.com/microsoft365dev/client-secret-expiration-now-limited-to-a-maximum-of-two-years/?utm_source=chatgpt.com)

---

## 🧩 Ping Identity (PingOne and PingFederate)

* **Client Secret Expiration** :
* Ping Identity does not enforce automatic expiration of client secrets.
* Administrators are responsible for managing the lifecycle of client secrets, including rotation and deletion.
* Reference:
  * [Rotating the Client Secret for an Application](https://docs.pingidentity.com/pingone/applications/p1_rotate_client_secret.html)
* **Inactivation and Rotation** :
* PingOne allows administrators to rotate client secrets via the admin console or API.
* After updating a client secret, the previous secret can be retained for a configurable period (1, 7, or 30 days) to allow applications to update without downtime.
* In PingFederate, the client secret retention period can be set up to 43,800 minutes (30 days).
* References:
  * [Rotating the Client Secret for a Resource](https://docs.pingidentity.com/pingone/applications/p1_rotate_client_secret_resource.html)
  * [Managing Client Configuration Defaults - PingFederate](https://docs.pingidentity.com/r/en-us/pingfederate-112/help_clientsettingstasklet_oauthdynamicclientregistrationdefaultsstate)

---

## 📜 Relevant RFCs and Standards

* **RFC 6749: The OAuth 2.0 Authorization Framework** :
* Outlines the core OAuth 2.0 protocol but does not specify client secret rotation practices.
* Reference:
  * [RFC 6749]()
* **RFC 7591: OAuth 2.0 Dynamic Client Registration Protocol** :
* Introduces the `client_secret_expires_at` parameter, allowing servers to set expiration times for client secrets.
* Reference:
  * [RFC 7591]()
* **RFC 7592: OAuth 2.0 Dynamic Client Registration Management Protocol** :
* Discusses client secret expiration and management, emphasizing the importance of handling secret lifecycles securely.
* Reference:
  * [RFC 7592]()
* **RFC 6819: OAuth 2.0 Threat Model and Security Considerations** :
* Provides security considerations for OAuth 2.0, including recommendations for credential management and rotation to mitigate risks.
* Reference:
  * [RFC 6819]()




Certainly! Here's an overview of how major identity providers handle the  **inactivation or disabling of OAuth2 client applications** :

---

### 🔐 Microsoft Entra ID (formerly Azure AD)

* **Disabling Application Sign-In** :You can prevent users from signing in to an application by disabling the application's sign-in capability. This action stops token issuance and effectively deactivates the app without deleting it
* Reference: [Disable user sign-in for application - Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/disable-user-sign-in-portal)
* **Restricting Access to Specific Users** :To limit application access, configure the app to require user assignment. Only assigned users or groups can access the application
* Reference: [Restrict a Microsoft Entra app to a set of users](https://learn.microsoft.com/en-us/entra/identity-platform/howto-restrict-your-app-to-a-set-of-users)

---

### 🔑 Okta

* **Deactivating an Application** In the Okta Admin Console, navigate to Applications > Applications, select the desired app, and choose "Deactivate" from the dropdown menu. This action disables the app integratio.
  * Reference: [Deactivate app integrations | Okta Classic Engine](https://help.okta.com/en-us/content/topics/apps/apps-deactivate.htm)
* **Token Revocation** To invalidate tokens issued to a client application, use the `/revoke` endpoint of the appropriate authorization serve.
  * Reference: [Revoke Tokens - Okta Developer](https://developer.okta.com/docs/guides/revoke-tokens/main/)

---

### 🧭 Amazon Cognito

* * *Deleting an App Client* : To disable a client application, delete the associated app client from the user pool. This action prevents users from signing in through that cliet.
  * Reference: [DeleteUserPoolClient - Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_DeleteUserPoolClient.html)
* * *Custom Authentication Flow* : While there's no direct method to disable a user pool, you can implement a Pre-Authentication Lambda trigger that denies all authentication attempts, effectively disabling acces.
  * Reference: [Is it possible to disable a Cognito user pool? - Stack Overflow](https://stackoverflow.com/questions/63621306/is-it-possible-to-disable-a-congnito-user-pool)

---

### 🧩 Ping Identity (PingOne / PingFederate)

* * *Managing OAuth Clients* : In PingFederate, navigate to Applications > OAuth > Clients to configure or disable client applicatins.
  * Reference: [Configuring OAuth clients | PingFederate Server](https://docs.pingidentity.com/pingfederate/12.2/administrators_reference_guide/pf_configuring_oauth_clients.html)
* * *Token Revocation Endpoint* : PingFederate provides a token revocation endpoint that allows clients to notify the authorization server that a previously obtained token is no longer needed, effectively invalidatingit.
  * Reference: [Token revocation endpoint | PingFederate Server](https://docs.pingidentity.com/pingfederate/latest/developers_reference_guide/pf_token_revoc_endpoint.html)





Based on the data provided from major identity providers, here are key recommendations for your **company policy on OAuth2 client secret expiration** in a  **banking context** . These policies should ensure strong security while maintaining operational flexibility.

### **1. Default Expiration Period for Client Secrets**

* **Expiration Enforced** : Client secrets should **always expire** after a defined period. Secrets that never expire pose a serious security risk, especially if they get compromised.
* **Expiration Timeframe** :
* Set a **maximum expiration period of 1 year** for client secrets, in line with common practices (like Microsoft Entra ID).
* **Two-year expiration** is acceptable if the provider allows it, but it's best to align with **industry best practices** and periodically review the expiration policy.
* **Banking Considerations** : 1 year should be optimal for most banking apps, as it balances security and usability.
* **Policy Enforcement** :
* Require **automatic expiration** and enforce notifications or alerts to the client ahead of the expiration.
* **No indefinite expiration** : Limit configuration options for client secrets that never expire.

### **2. Manual Rotation of Client Secrets**

* **Rotation Frequency** : Clients should rotate secrets at least  **every 6 months** .
* This rotation should be **manual** to ensure that application teams are aware and prepared to update their credentials.
* **Dual-Key Rotation** :
* Allow  **dual-key support** , which enables the application to maintain operational continuity while rotating the secret. Ensure that clients can generate a new secret while the old one remains valid for a short overlap period (typically 30 days).
* **Rotation Tools** :
* Provide **API endpoints** for clients to programmatically rotate their secrets, ensuring that automation can be implemented.

### **3. Automatic Rotation (Optional, but Recommended)**

* **Integration with Secret Management Tools** :
* If possible, **integrate OAuth client secret rotation** with  **AWS Secrets Manager** ,  **Azure Key Vault** , or any internal secret management solutions.
* This allows for **automatic** rotation without manual intervention while maintaining high levels of security and auditing.
* **Scheduled Rotation** :
* Implement scheduled or policy-driven rotation where secrets are automatically regenerated and updated by the system at regular intervals, typically every  **6 months to 1 year** .

### **4. Inactivation or Deactivation of Applications**

* **Inactivation** :
* Allow clients to **temporarily disable applications** without deletion. This should be a feature for clients who need to suspend token issuance (e.g., during maintenance or a potential breach).
* Inactivation should be  **easy to reverse** , so clients can quickly reactivate when needed.
* **Revocation Mechanisms** :
* Ensure that clients can **revoke client secrets** independently of other secrets. If one secret is compromised, it should be possible to revoke only that secret without affecting others.

### **5. Monitoring, Logging, and Alerts**

* **Audit Logging** :
* All  **client secret access** ,  **rotation** , and **deletion** events should be logged for audit purposes. Logs should be kept for a minimum of  **1 year** .
* This ensures that if any secrets are misused, there is traceable evidence to investigate.
* **Alerts for Expiring Secrets** :
* Ensure that **automated alerts** are triggered when a client secret is near expiration (e.g., 30 days in advance) so the client can take action.

### **6. Client Secret Revocation**

* **Revocation** :
* Implement mechanisms for clients to  **revocate individual secrets** . This allows for precise control over when a secret is no longer valid, especially useful if a secret is compromised.

### **7. RFC Compliance**

* **RFC 7591 Compliance** :
* Ensure the system **supports `client_secret_expires_at`** (RFC 7591), which allows expiration dates to be set and validated within the OAuth2 flow.
* Adhere to **RFC 6819** guidelines for **secure storage** of client secrets.
