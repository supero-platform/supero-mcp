# Book club data model. Namespace is a plain string literal on every schema dict.

BookProposal = {
    "schema_type": "object", "name": "BookProposal", "namespace": "lumen", "parent_type": "tenant",
    "description": "A book a club member has proposed as a future monthly read, with pitch and cover.",
    "attributes": [
        {"name": "title", "type": "string", "mandatory": True},
        {"name": "author", "type": "string", "mandatory": True},
        {"name": "genre", "type": "string"},
        {"name": "page_count", "type": "integer"},
        {"name": "pitch", "type": "text"},
        {"name": "cover", "type": "Image"},
        {"name": "cycle", "type": "string"},
        {"name": "proposal_state", "type": "string", "values": ["proposed", "selected", "read"]},
        {"name": "proposer_name", "type": "string"},
        {"name": "proposer_email", "type": "string"},
    ],
}

Vote = {
    "schema_type": "object", "name": "Vote", "namespace": "lumen", "parent_type": "tenant",
    "description": "One member's vote for a proposed book in a given monthly voting cycle.",
    "attributes": [
        {"name": "cycle", "type": "string", "mandatory": True},
        {"name": "book_key", "type": "string", "mandatory": True},
        {"name": "book_title", "type": "string"},
        {"name": "voter_name", "type": "string"},
        {"name": "voter_email", "type": "string", "mandatory": True},
    ],
}

Meeting = {
    "schema_type": "object", "name": "Meeting", "namespace": "lumen", "parent_type": "tenant",
    "description": "A monthly book club meeting with date, place, host and the book being discussed.",
    "attributes": [
        {"name": "title", "type": "string", "mandatory": True},
        {"name": "meeting_time", "type": "datetime", "mandatory": True},
        {"name": "location", "type": "string"},
        {"name": "host_name", "type": "string"},
        {"name": "agenda", "type": "text"},
        {"name": "book_title", "type": "string"},
        {"name": "cycle", "type": "string"},
        {"name": "photo", "type": "Image"},
    ],
}

Rsvp = {
    "schema_type": "object", "name": "Rsvp", "namespace": "lumen", "parent_type": "tenant",
    "description": "A member's reply to a monthly meeting invitation: going, maybe or not going.",
    "attributes": [
        {"name": "meeting_key", "type": "string", "mandatory": True},
        {"name": "meeting_title", "type": "string"},
        {"name": "response", "type": "string", "mandatory": True, "values": ["going", "maybe", "not_going"]},
        {"name": "guest_count", "type": "integer"},
        {"name": "note", "type": "string"},
        {"name": "member_name", "type": "string"},
        {"name": "member_email", "type": "string", "mandatory": True},
        {"name": "workflow_status", "type": "string"},
        {"name": "processed_at", "type": "datetime"},
    ],
}

ALL_SCHEMAS = [BookProposal, Vote, Meeting, Rsvp]
PUBLIC_SCHEMAS = []
