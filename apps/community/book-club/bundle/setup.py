import sys, os, datetime
sys.path.insert(0, os.path.dirname(__file__))
from supero.app_setup import AppSetup, PolicyDef, PolicyRule, make_seed_record
from config import AppConfig
from schemas import ALL_SCHEMAS, PUBLIC_SCHEMAS

seed_record = make_seed_record(ALL_SCHEMAS)
TENANT = "default-tenant"
MEMBER = "member@pageturners.club"
ORGANIZER = "organizer@pageturners.club"


def month_key(offset):
    """'YYYY-MM' for the month `offset` months from the current one."""
    today = datetime.date.today()
    idx = today.year * 12 + (today.month - 1) + offset
    return "%04d-%02d" % (idx // 12, idx % 12 + 1)


def at(days, hour=19):
    base = datetime.datetime.utcnow() + datetime.timedelta(days=days)
    return base.replace(hour=hour, minute=0, second=0, microsecond=0).isoformat() + "Z"


def ux(pid):
    base = "https://images.unsplash.com/photo-" + pid + "?auto=format&fit=crop&q=80"
    return {"url": base + "&w=1200&h=800", "thumbnail_url": base + "&w=600&h=400"}


# Organizer runs the club; members read everything shared, propose books, and cast /
# change a vote and an RSVP. Votes and RSVPs are shared-read so everyone sees the tally.
POLICIES = [
    PolicyDef(role="tenant_admin", default_access="full", rules=[]),
    PolicyDef(role="tenant_user", default_access="none", rules=[
        PolicyRule(entity="book_proposal", can_read=True, can_create=True),
        PolicyRule(entity="vote", can_read=True, can_create=True, can_update=True),
        PolicyRule(entity="meeting", can_read=True),
        PolicyRule(entity="rsvp", can_read=True, can_create=True, can_update=True),
    ]),
]

NEXT = month_key(1)
THIS = month_key(0)
LAST = month_key(-1)

# (slug, title, author, genre, pages, pitch, photo id, cycle, state, proposer, proposer email)
BOOKS = [
    ("the-overstory", "The Overstory", "Richard Powers", "Literary fiction", 502,
     "Nine strangers and the trees that tie them together. Big, strange and worth arguing about.",
     "1544947950-fa07a98d237f", NEXT, "proposed", "Marcus Lee", MEMBER),
    ("piranesi", "Piranesi", "Susanna Clarke", "Fantasy", 272,
     "A short, eerie puzzle of a novel set in an endless house of statues and tides.",
     "1512820790803-83ca734da794", NEXT, "proposed", "Priya Nair", "priya@pageturners.club"),
    ("pachinko", "Pachinko", "Min Jin Lee", "Historical fiction", 496,
     "Four generations of a Korean family in Japan. Long, but nobody puts it down.",
     "1481627834876-b7833e8f5570", NEXT, "proposed", "Olivia Hart", ORGANIZER),
    ("klara-and-the-sun", "Klara and the Sun", "Kazuo Ishiguro", "Science fiction", 320,
     "An artificial friend watches a family from a shop window. Quiet and devastating.",
     "1524995997946-a1c2e315a42f", NEXT, "proposed", "Tom Becker", "tom@pageturners.club"),
    ("braiding-sweetgrass", "Braiding Sweetgrass", "Robin Wall Kimmerer", "Non-fiction", 408,
     "Essays on botany and indigenous knowledge. A change of pace from our novel streak.",
     "1495446815901-a7297e633e8d", NEXT, "proposed", "Priya Nair", "priya@pageturners.club"),
    ("the-remains-of-the-day", "The Remains of the Day", "Kazuo Ishiguro", "Classic", 258,
     "A butler looks back on a life of service. Short enough for a busy month.",
     "1507842217343-583bb7270b66", NEXT, "proposed", "Dana Ruiz", "dana@pageturners.club"),
    ("tomorrow-and-tomorrow", "Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "Contemporary", 416,
     "Two friends build video games across thirty years. About work and friendship more than games.",
     "1519682337058-a94d519337bc", NEXT, "proposed", "Tom Becker", "tom@pageturners.club"),
    ("the-left-hand-of-darkness", "The Left Hand of Darkness", "Ursula K. Le Guin", "Science fiction", 304,
     "An envoy on a winter planet whose people have no fixed gender. A classic we keep skipping.",
     "1532012197267-da84d127e765", NEXT, "proposed", "Dana Ruiz", "dana@pageturners.club"),
    ("demon-copperhead", "Demon Copperhead", "Barbara Kingsolver", "Literary fiction", 560,
     "David Copperfield retold in Appalachia. This month's pick.",
     "1543002588-bfa74002ed7e", THIS, "selected", "Olivia Hart", ORGANIZER),
    ("station-eleven", "Station Eleven", "Emily St. John Mandel", "Science fiction", 336,
     "A travelling theatre troupe after the collapse. Last month's read.",
     "1516979187457-637abb4f9353", LAST, "read", "Marcus Lee", MEMBER),
]

# (voter name, voter email, book slug) for next month's cycle
VOTES = [
    ("Priya Nair", "priya@pageturners.club", "piranesi"),
    ("Tom Becker", "tom@pageturners.club", "piranesi"),
    ("Dana Ruiz", "dana@pageturners.club", "the-left-hand-of-darkness"),
    ("Olivia Hart", ORGANIZER, "pachinko"),
    ("Sam Whitfield", "sam@pageturners.club", "piranesi"),
    ("Ines Castro", "ines@pageturners.club", "the-overstory"),
    ("Jo Park", "jo@pageturners.club", "pachinko"),
]

# (slug, title, days from now, location, host, agenda, book, cycle, photo id)
MEETINGS = [
    ("last-month-meeting", "Station Eleven discussion", -24, "Hartley Public Library, Room 2", "Marcus Lee",
     "Discussion of Station Eleven, then nominations for the following month.", "Station Eleven", LAST,
     "1497633762265-9d179a990aa6"),
    ("this-month-meeting", "Demon Copperhead discussion", 6, "Olivia's place, 14 Linden Street", "Olivia Hart",
     "7:00 arrive and snacks. 7:30 discussion. 8:45 announce next month's winning book.", "Demon Copperhead", THIS,
     "1476275466078-4007374efbbe"),
    ("next-month-meeting", "Next month's meeting", 34, "The Reading Room Cafe, back table", "Priya Nair",
     "Book to be decided by the vote. Bring one suggestion for the month after.", "To be voted", NEXT,
     "1521587760476-6c12a4b040da"),
]

# (member name, email, meeting slug, response, guests, note)
RSVPS = [
    ("Olivia Hart", ORGANIZER, "this-month-meeting", "going", 0, "Hosting. I have chairs for twelve."),
    ("Priya Nair", "priya@pageturners.club", "this-month-meeting", "going", 1, "Bringing my sister."),
    ("Tom Becker", "tom@pageturners.club", "this-month-meeting", "maybe", 0, "Depends on a work trip."),
    ("Dana Ruiz", "dana@pageturners.club", "this-month-meeting", "going", 0, "I will bring dessert."),
    ("Sam Whitfield", "sam@pageturners.club", "this-month-meeting", "not_going", 0, "Out of town, sorry."),
    ("Ines Castro", "ines@pageturners.club", "this-month-meeting", "going", 0, ""),
    ("Priya Nair", "priya@pageturners.club", "next-month-meeting", "going", 0, "Hosting at the cafe."),
]


def seed_test_data(s, base, domain, tenant_uuid, progress):
    books = {}
    for (slug, title, author, genre, pages, pitch, pid, cycle, state, pname, pemail) in BOOKS:
        rec = {"name": slug, "display_name": title, "description": "%s by %s" % (title, author),
               "title": title, "author": author, "genre": genre, "page_count": pages, "pitch": pitch,
               "cover": ux(pid), "cycle": cycle, "proposal_state": state,
               "proposer_name": pname, "proposer_email": pemail}
        u = seed_record(s, base, domain, "BookProposal", rec, progress=progress, tenant_name=TENANT)
        if u:
            books[slug] = (u, title)
    progress.ok("Seeded %d book proposals." % len(books))

    nv = 0
    for (vname, vemail, slug) in VOTES:
        if slug not in books:
            continue
        rec = {"name": "vote-%s-%s" % (NEXT, vemail.split("@")[0]),
               "display_name": "%s votes for %s" % (vname, books[slug][1]),
               "description": "Vote for cycle %s" % NEXT,
               "cycle": NEXT, "book_key": books[slug][0], "book_title": books[slug][1],
               "voter_name": vname, "voter_email": vemail}
        if seed_record(s, base, domain, "Vote", rec, progress=progress, tenant_name=TENANT):
            nv += 1
    progress.ok("Seeded %d votes." % nv)

    meetings = {}
    for (slug, title, days, location, host, agenda, book, cycle, pid) in MEETINGS:
        rec = {"name": slug, "display_name": title, "description": "Monthly meeting: %s" % title,
               "title": title, "meeting_time": at(days), "location": location, "host_name": host,
               "agenda": agenda, "book_title": book, "cycle": cycle, "photo": ux(pid)}
        u = seed_record(s, base, domain, "Meeting", rec, progress=progress, tenant_name=TENANT)
        if u:
            meetings[slug] = (u, title)
    progress.ok("Seeded %d meetings." % len(meetings))

    nr = 0
    for (mname, memail, slug, response, guests, note) in RSVPS:
        if slug not in meetings:
            continue
        rec = {"name": "rsvp-%s-%s" % (slug, memail.split("@")[0]),
               "display_name": "%s: %s" % (mname, response),
               "description": "RSVP to %s" % meetings[slug][1],
               "meeting_key": meetings[slug][0], "meeting_title": meetings[slug][1],
               "response": response, "guest_count": guests, "note": note,
               "member_name": mname, "member_email": memail}
        if seed_record(s, base, domain, "Rsvp", rec, progress=progress, tenant_name=TENANT):
            nr += 1
    progress.ok("Seeded %d RSVPs." % nr)


def main():
    setup = AppSetup(AppConfig(), ALL_SCHEMAS, PUBLIC_SCHEMAS)
    setup.run(seed_fn=seed_test_data, policies=POLICIES)


if __name__ == "__main__":
    main()
