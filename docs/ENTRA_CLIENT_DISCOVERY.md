# Microsoft Entra Integration — Discovery Guide

*Use this document when speaking with a client who has asked about Microsoft Entra (Azure AD) integration. Share it with them in advance of the conversation, or work through it together.*

---

## What we've already built

StaySecure already supports **Single Sign-On (SSO) with Microsoft Entra**. This means:

- Users can sign in to StaySecure with their existing Microsoft work account — no separate password needed.
- The first time a user signs in with Microsoft, their StaySecure profile is created automatically using their name and email from Entra. No manual user import or activation email is required.
- If a user's account is disabled in Entra, they cannot sign in to StaySecure.

This is live and available to any client on a dedicated StaySecure instance.

---

## Capability menu

The table below describes what else we can enable beyond basic SSO. Each row is an independent capability — you don't need all of them, and they can be rolled out in stages.

| Capability | What you get | What it requires from you |
|------------|-------------|--------------------------|
| **SSO — Sign in with Microsoft** | Users authenticate with their Microsoft work account. No separate StaySecure password needed. | Your IT admin registers StaySecure as an enterprise application in your Entra tenant and grants consent. One-time setup, ~30 minutes. |
| **Automatic profile creation** | When a user signs in for the first time, their StaySecure profile is created instantly with their name and email. No admin action needed per user. | Included with SSO — no extra setup. |
| **Department and job title** | The user's department and job title in Entra are automatically written to their StaySecure profile on first login. Managers can still edit these manually afterwards. | Your IT admin adds two optional token claims (`department`, `jobTitle`) to the enterprise app configuration. 5-minute change. |
| **Employee ID** | Entra's employee ID field is synced to StaySecure on first login. Useful if you use employee IDs in reporting or integrations. | Your IT admin adds the `employeeId` optional token claim. 5-minute change. |
| **Manager relationships** | Each user's direct line manager is linked in StaySecure, enabling manager-scoped reporting, document visibility, and escalation workflows. | Requires automated directory sync (SCIM — see below). Manager data is not available in the login token alone. |
| **Automated provisioning** | New starters get a StaySecure account automatically when added to Entra — no manual import needed. | Requires SCIM (see below). Your IT admin enables automatic provisioning in the enterprise app and points it at our endpoint. |
| **Automated deprovisioning** | When a user is removed or disabled in Entra, their StaySecure account is deactivated automatically. | Requires SCIM (see below). |
| **Group-based access** | Entra security groups can map to roles or learning tracks in StaySecure. For example, members of the "IT Department" group are automatically enrolled in the cybersecurity learning track. | Requires SCIM (see below) plus a one-time mapping configuration between your Entra groups and StaySecure departments or roles. |
| **Device inventory sync** | Devices managed in Microsoft Intune are synced into StaySecure's asset register. Useful for asset-based risk scoring in Govern. | Your IT admin creates an Azure App Registration with Intune read permissions and shares the credentials with us. |

### What is SCIM?

SCIM (System for Cross-domain Identity Management) is the industry-standard protocol that Microsoft Entra uses to automatically push user and group changes to SaaS applications. When SCIM is configured, Entra notifies StaySecure whenever a user is added, changed, or removed — without any manual action. It is the recommended approach for organisations that want fully automated lifecycle management. Estimated setup effort: 2–3 weeks of engineering on our side, plus ~1 hour of your IT admin's time to configure provisioning in the Entra portal.

---

## Discovery questions

Please share your answers to help us scope the right integration for your organisation.

### Your current environment

1. Do you currently use Microsoft Entra ID (formerly Azure Active Directory) to manage your users and devices?
2. Is your Entra environment actively maintained — i.e. are new starters and leavers processed promptly through IT?
3. Roughly how many users would be covered by the StaySecure integration?
4. Do you use Entra security groups to manage access to other SaaS tools today?
5. Do you use Microsoft Intune to manage devices?

### Your onboarding and offboarding process

6. When a new starter joins, how do they currently get access to SaaS applications? (e.g. IT provisions each app manually, HR triggers an automated workflow, the user requests access themselves)
7. When someone leaves, how is their access removed? Is it automated, or does it rely on a manual IT ticket?
8. Have you had incidents where a leaver retained access to tools longer than intended?

### Your priorities for this integration

9. Which of the following best describes what you're trying to solve? (Select all that apply)
   - [ ] I want users to sign in with their Microsoft account instead of managing a separate password
   - [ ] I want new starters to get StaySecure access automatically without admin effort
   - [ ] I want leavers to lose access automatically when removed from Entra
   - [ ] I want org structure (departments, managers) to stay accurate in StaySecure without manual maintenance
   - [ ] I want to use Entra groups to control who gets enrolled in which training
   - [ ] I want device data from Intune in StaySecure's asset register

10. Is Entra integration a requirement before go-live, or something you'd like to add after the initial rollout?

11. Do you have an IT admin (or Entra administrator) who can be available for the configuration steps? Approximately 1–2 hours of their time is needed for initial setup, with occasional involvement for token rotation and troubleshooting.

### IT and security

12. Does your organisation's Entra tenant policy require admin consent before enterprise applications can be granted access? (Common in security-conscious organisations — it just means your IT admin needs to click "Accept" once on a Microsoft consent screen.)
13. Does your organisation have any restrictions on third-party applications connecting to your Entra directory via API?

---

## What to expect

| Integration tier | What's included | Approximate effort |
|-----------------|-----------------|-------------------|
| **SSO only** | Sign in with Microsoft, automatic profile creation | Already built — hours to enable per client |
| **SSO + profile enrichment** | Above + department, job title, employee ID on first login | 1–2 days engineering + 5 min IT admin config |
| **SSO + SCIM** | Above + automated provisioning/deprovisioning, manager sync, group-based access | 2–3 weeks engineering + ~1 hr IT admin setup |
| **+ Device sync (Intune)** | Device inventory synced from Intune | Already built — ~30 min IT admin config |

*These are indicative effort ranges, not quotes. Final scope depends on your specific requirements and Entra configuration.*

---

## Next steps

Once you've shared your answers, we'll confirm which capabilities make sense for your rollout and whether they're included in your current agreement or require a separate scope.

Questions? Contact your StaySecure implementation contact.
