import os
from dataclasses import dataclass, field


@dataclass
class AppConfig:
    app_name: str = "Page Turners"
    app_emoji: str = "📚"
    app_description: str = "A book club: propose books, vote on next month's read, and RSVP to the monthly meeting."
    domain_name: str    = field(default_factory=lambda: os.getenv("SUPERO_DOMAIN", "your-domain"))
    admin_email: str    = field(default_factory=lambda: os.getenv("SUPERO_ADMIN_EMAIL", "organizer@pageturners.club"))
    admin_password: str = field(default_factory=lambda: os.getenv("SUPERO_PASSWORD", "") or "Password123!")
    project_name: str   = field(default_factory=lambda: os.getenv("SUPERO_PROJECT", "your-project"))
    tenants: list = field(default_factory=lambda: [
        {"name": "default-tenant", "display_name": "Page Turners"},
    ])
    users: list = field(default_factory=lambda: [
        {"email": "organizer@pageturners.club", "password": "Password123!", "role": "tenant_admin",
         "full_name": "Olivia Hart", "tenant": "default-tenant"},
        {"email": "member@pageturners.club", "password": "Password123!", "role": "tenant_user",
         "full_name": "Marcus Lee", "tenant": "default-tenant"},
        {"email": "testapp@test.com", "password": "Password123!", "role": "developer",
         "full_name": "App Tester", "tenant": "default-tenant"},
    ])
    services: list = field(default_factory=lambda: [])
    public_schemas: list = field(default_factory=lambda: [])
