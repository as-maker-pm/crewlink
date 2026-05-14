# Missing Code Integration

_Started 2026-05-11 22:01 UTC_

---

## User

update the app with anything missing from the new code linked

## Assistant

_[tool: list_files]_

_[tool: local_ls]_

_[tool: local_ls]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: local_ls]_

_[tool: local_read]_

_[tool: local_read]_

_[tool: local_read]_

_[tool: snip]_

_[tool: local_read]_

_[tool: local_ls]_

_[tool: local_ls]_

_[tool: local_read]_

_[tool: local_read]_

_[tool: local_read]_

_[tool: local_read]_

_[tool: snip]_

_[tool: str_replace_edit]_

I've reviewed the codebase. Here's what's missing from the prototype that needs to be added:

1. **Terminology**: "Clients" → "Dispatching Companies", contacts → "Dispatchers (CPMs)"
2. **Survey statuses**: Codebase only uses Pending/Completed/Cancelled (not Scheduled/In Progress)
3. **Auth flows**: Sign In, Forgot Password screens
4. **CPM/Dispatcher overview**: Separate route with "Invited" status + Resend Invite
5. **Payment screens**: Success + Cancel (from Stripe flow)
6. **404 Not Found** page
7. **Technician availability**: Per-day slot structure (Mon-Fri 9-5 default), service radius (default 250 mi)
8. **Survey request additions**: homeownerName, proposal file, cancellationReason, noteText
9. **Tenant service**: slotMinutes (duration), active/inactive status
10. **Full US timezone list**

Let me apply these updates:

_[tool: str_replace_edit]_

_[tool: snip]_

Now let me update the ClientDetail (Dispatching Company) to use the CPM data structure with click-through, and add the CPM Detail screen. Also update the request detail with proposal/cancellation reason, and the tech detail with proper availability.

_[tool: str_replace_edit]_

_[tool: snip]_

Now let me update the RequestDetail with homeowner info, proposal file, and cancellation reason; update TechDetail with proper availability schedule + service radius; update TenantServices; and add auth/payment/404 screens.

_[tool: str_replace_edit]_

_[tool: list_files]_

_[tool: grep]_

_[tool: grep]_

_[tool: snip]_

Good — the seed data already has all the fields. Now let me check the TenantServices page and add the missing auth/payment/404 screens. Let me first verify current state and find what's missing.

_[tool: grep]_

_[tool: snip]_

Let me check what auth and other unbuilt screens look like currently, and then add them. Let me also check the App component structure to see how to add auth flow.

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: read_file]_

Now I'll add the missing screens: auth (sign-in + forgot-password), payment success/cancel, 404, and a "Sign out" action.

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

Now update the App component to handle authView state, and add Sign Out + screen-preview buttons:

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: done]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

## Assistant

