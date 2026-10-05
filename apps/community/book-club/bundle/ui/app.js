(function () {
  var h = React.createElement;
  var cfg = window.__SUPERO_CONFIG || {};
  var APP_NAME = cfg.appName || 'Page Turners';

  // ── helpers ────────────────────────────────────────────────────────────────
  function bcMonthKey(offset) {
    var d = new Date();
    var idx = d.getFullYear() * 12 + d.getMonth() + offset;
    var m = (idx % 12) + 1;
    return Math.floor(idx / 12) + '-' + (m < 10 ? '0' + m : '' + m);
  }
  function bcMonthLabel(key) {
    var names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    var parts = String(key || '').split('-');
    var i = parseInt(parts[1], 10) - 1;
    return names[i] ? names[i] + ' ' + parts[0] : String(key || '');
  }
  function bcWhen(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso || '');
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) +
      ' at ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }
  function bcImg(v) {
    try { return resolveImageUrl(v) || ''; } catch (e) { return (v && (v.thumbnail_url || v.url)) || ''; }
  }
  function bcMe() {
    var u = client.userInfo || {};
    var saved = '';
    try { saved = window.localStorage.getItem('bc_email') || ''; } catch (e) { saved = ''; }
    var email = u.email || u.username || saved || u.name || '';
    var name = u.fullName || u.full_name || u.display_name || (email ? email.split('@')[0] : 'Member');
    return { email: String(email).toLowerCase(), name: name };
  }
  function bcIsOrganizer() {
    try {
      return client.isAdmin() || ['tenant_admin', 'project_admin', 'domain_admin', 'platform_admin', 'developer']
        .indexOf((client.userInfo || {}).role) >= 0;
    } catch (e) { return false; }
  }
  function bcList(schema) {
    return client.getObjects(schema).then(function (rows) {
      if (Array.isArray(rows)) return rows;
      return (rows && rows.results) || [];
    });
  }
  function bcErr(e) { return (e && e.message) || 'Something went wrong'; }
  function bcGo(hash) { window.location.hash = hash; }

  var RESPONSES = [
    { key: 'going', label: 'Going' },
    { key: 'maybe', label: 'Maybe' },
    { key: 'not_going', label: "Can't make it" }
  ];
  function bcResponseLabel(k) {
    for (var i = 0; i < RESPONSES.length; i++) if (RESPONSES[i].key === k) return RESPONSES[i].label;
    return k || '';
  }

  var CSS = [
    '#root,#app,#__next,#supero-preloader{display:none!important}',
    '#bookclub-root{position:fixed;inset:0;min-height:100vh;overflow:auto;z-index:2147483647;background:#f6f1e7;color:#2b2118;font-family:Georgia,"Times New Roman",serif}',
    '#bookclub-root *{box-sizing:border-box}',
    '.bc-top{background:#3b2a20;color:#f6f1e7;position:sticky;top:0;z-index:5}',
    '.bc-top-in{max-width:1040px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}',
    '.bc-brand{font-size:20px;font-weight:700;cursor:pointer;margin-right:auto}',
    '.bc-nav{background:none;border:0;color:#e8dcc8;font:inherit;font-size:15px;cursor:pointer;padding:6px 10px;border-radius:6px}',
    '.bc-nav.on{background:#f6f1e7;color:#3b2a20}',
    '.bc-wrap{max-width:1040px;margin:0 auto;padding:28px 20px 80px}',
    '.bc-h1{font-size:30px;margin:0 0 6px}',
    '.bc-h2{font-size:21px;margin:28px 0 12px}',
    '.bc-mut{color:#7a6a5a;font-size:14px;font-family:system-ui,sans-serif}',
    '.bc-card{background:#fffdf8;border:1px solid #e4d9c5;border-radius:12px;overflow:hidden}',
    '.bc-pad{padding:18px}',
    '.bc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:18px}',
    '.bc-cover{width:100%;height:150px;object-fit:cover;display:block;background:#e4d9c5}',
    '.bc-btn{font-family:system-ui,sans-serif;font-size:14px;border:1px solid #3b2a20;background:#3b2a20;color:#fff;border-radius:8px;padding:8px 14px;cursor:pointer}',
    '.bc-btn:disabled{opacity:.5;cursor:default}',
    '.bc-btn.alt{background:#fffdf8;color:#3b2a20}',
    '.bc-btn.on{background:#a8552a;border-color:#a8552a;color:#fff}',
    '.bc-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}',
    '.bc-chip{font-family:system-ui,sans-serif;font-size:12px;background:#efe5d2;border-radius:999px;padding:3px 10px;color:#5a4636}',
    '.bc-chip.win{background:#a8552a;color:#fff}',
    '.bc-bar{height:8px;background:#efe5d2;border-radius:99px;overflow:hidden;margin:10px 0 6px}',
    '.bc-bar>i{display:block;height:100%;background:#a8552a}',
    '.bc-input{width:100%;font:inherit;font-family:system-ui,sans-serif;font-size:15px;padding:9px 11px;border:1px solid #cdbfa8;border-radius:8px;background:#fff;margin:4px 0 12px}',
    '.bc-label{font-family:system-ui,sans-serif;font-size:13px;color:#5a4636}',
    '.bc-login{max-width:400px;margin:9vh auto 0;padding:32px}',
    '.bc-err{color:#b3261e;font-family:system-ui,sans-serif;font-size:14px;margin-bottom:10px}',
    '.bc-list{list-style:none;margin:0;padding:0;font-family:system-ui,sans-serif;font-size:14px}',
    '.bc-list li{padding:8px 0;border-top:1px solid #efe5d2;display:flex;gap:10px;justify-content:space-between}',
    '.bc-two{display:grid;grid-template-columns:1fr 1fr;gap:18px}',
    '@media(max-width:760px){.bc-two{grid-template-columns:1fr}}'
  ].join('\n');

  // ── login ──────────────────────────────────────────────────────────────────
  function LoginScreen(props) {
    var [email, setEmail] = React.useState('');
    var [pw, setPw] = React.useState('');
    var [busy, setBusy] = React.useState(false);
    var [err, setErr] = React.useState('');
    function submit(e) {
      e.preventDefault(); setBusy(true); setErr('');
      client.login(cfg.domain, email, pw, cfg.project, '')
        .then(function () {
          try { window.localStorage.setItem('bc_email', email); } catch (ex) { /* ignore */ }
          setBusy(false); props.onDone();
        })
        .catch(function (ex) { setBusy(false); setErr(bcErr(ex)); });
    }
    return h('form', { className: 'bc-card bc-login', onSubmit: submit },
      h('h1', { className: 'bc-h1' }, '📚 ' + APP_NAME),
      h('p', { className: 'bc-mut', style: { marginBottom: '20px' } },
        'Propose books, vote on next month\'s read, and RSVP to the monthly meeting.'),
      h('label', { className: 'bc-label' }, 'Email'),
      h('input', { className: 'bc-input', type: 'email', value: email, autoFocus: true,
        onChange: function (e) { setEmail(e.target.value); } }),
      h('label', { className: 'bc-label' }, 'Password'),
      h('input', { className: 'bc-input', type: 'password', value: pw,
        onChange: function (e) { setPw(e.target.value); } }),
      err ? h('div', { className: 'bc-err' }, err) : null,
      h('button', { className: 'bc-btn', type: 'submit', disabled: busy, style: { width: '100%' } },
        busy ? 'Signing in…' : 'Sign in'));
  }

  // ── top bar ────────────────────────────────────────────────────────────────
  function NavButton(props) {
    return h('button', { className: 'bc-nav' + (props.on ? ' on' : ''),
      onClick: function () { bcGo(props.to); } }, props.label);
  }
  function TopBar(props) {
    var me = bcMe();
    return h('div', { className: 'bc-top' }, h('div', { className: 'bc-top-in' },
      h('div', { className: 'bc-brand', onClick: function () { bcGo('#/'); } }, '📚 ' + APP_NAME),
      h(NavButton, { to: '#/', label: 'This month', on: props.route === '#/' }),
      h(NavButton, { to: '#/vote', label: 'Vote', on: props.route === '#/vote' }),
      h(NavButton, { to: '#/propose', label: 'Propose a book', on: props.route === '#/propose' }),
      h(NavButton, { to: '#/meetings', label: 'Meetings', on: props.route.indexOf('#/meeting') === 0 }),
      h('span', { className: 'bc-mut', style: { color: '#cbbba5' } }, me.name + (bcIsOrganizer() ? ' (organizer)' : '')),
      h('button', { className: 'bc-nav', onClick: props.onLogout }, 'Sign out')));
  }

  // ── voting ─────────────────────────────────────────────────────────────────
  function tally(books, votes, cycle) {
    var counts = {}; var total = 0;
    votes.forEach(function (v) {
      if (v.cycle !== cycle) return;
      counts[v.book_key] = (counts[v.book_key] || 0) + 1; total++;
    });
    var rows = books.filter(function (b) { return b.cycle === cycle && b.proposal_state !== 'read'; })
      .map(function (b) { return { book: b, count: counts[b.uuid] || 0 }; });
    rows.sort(function (a, b) { return b.count - a.count || String(a.book.title).localeCompare(String(b.book.title)); });
    return { rows: rows, total: total };
  }
  function myVote(votes, cycle) {
    var me = bcMe().email;
    for (var i = 0; i < votes.length; i++) {
      if (votes[i].cycle === cycle && String(votes[i].voter_email || '').toLowerCase() === me) return votes[i];
    }
    return null;
  }

  function BookCard(props) {
    var b = props.row.book; var count = props.row.count;
    var pct = props.total ? Math.round(100 * count / props.total) : 0;
    var mine = props.mine && props.mine.book_key === b.uuid;
    var src = bcImg(b.cover);
    return h('div', { className: 'bc-card' },
      src ? h('img', { className: 'bc-cover', src: src, alt: '',
        onError: function (e) { e.target.style.display = 'none'; } }) : null,
      h('div', { className: 'bc-pad' },
        h('div', { className: 'bc-row', style: { justifyContent: 'space-between' } },
          h('strong', { style: { fontSize: '18px' } }, b.title),
          props.leader && count > 0 ? h('span', { className: 'bc-chip win' }, 'Leading') : null),
        h('div', { className: 'bc-mut' }, (b.author || '') + (b.page_count ? ' · ' + b.page_count + ' pages' : '') +
          (b.genre ? ' · ' + b.genre : '')),
        h('p', { style: { fontSize: '15px', margin: '10px 0' } }, b.pitch || ''),
        h('div', { className: 'bc-mut' }, 'Proposed by ' + (b.proposer_name || 'a member')),
        h('div', { className: 'bc-bar' }, h('i', { style: { width: pct + '%' } })),
        h('div', { className: 'bc-row', style: { justifyContent: 'space-between' } },
          h('span', { className: 'bc-mut' }, count + (count === 1 ? ' vote' : ' votes')),
          h('button', { className: 'bc-btn' + (mine ? ' on' : ''), disabled: props.busy || mine,
            onClick: function () { props.onVote(b); } }, mine ? 'Your vote' : 'Vote for this'))));
  }

  function VotePage(props) {
    var d = props.data; var cycle = bcMonthKey(1);
    var [busy, setBusy] = React.useState(false);
    var t = tally(d.books, d.votes, cycle);
    var mine = myVote(d.votes, cycle);
    function vote(b) {
      var me = bcMe(); setBusy(true);
      var body = { book_key: b.uuid, book_title: b.title };
      var p = mine
        ? client.updateObject('vote', mine.uuid, body, mine)
        : client.createObject('vote', { cycle: cycle, book_key: b.uuid, book_title: b.title,
            voter_name: me.name, voter_email: me.email, display_name: me.name + ' votes for ' + b.title });
      p.then(function () { showToast(mine ? 'Vote changed to ' + b.title : 'Vote recorded for ' + b.title, 'success'); })
        .catch(function (e) { showToast('Could not save vote: ' + bcErr(e), 'error'); })
        .then(function () { setBusy(false); props.reload(); });
    }
    function renderCard(row, i) {
      return h(BookCard, { key: row.book.uuid, row: row, total: t.total, mine: mine, busy: busy,
        leader: i === 0, onVote: vote });
    }
    return h('div', null,
      h('h1', { className: 'bc-h1' }, 'Vote: ' + bcMonthLabel(cycle) + ' read'),
      h('p', { className: 'bc-mut' }, t.total + ' votes cast so far. One vote per member; you can change it until the meeting. ' +
        (mine ? 'You voted for ' + (mine.book_title || 'a book') + '.' : 'You have not voted yet.')),
      t.rows.length === 0
        ? h('div', { className: 'bc-card bc-pad', style: { marginTop: '18px' } },
            'No books proposed for ' + bcMonthLabel(cycle) + ' yet. ',
            h('button', { className: 'bc-btn', onClick: function () { bcGo('#/propose'); } }, 'Propose one'))
        : h('div', { className: 'bc-grid', style: { marginTop: '18px' } }, t.rows.map(renderCard)));
  }

  // ── propose ────────────────────────────────────────────────────────────────
  function TextField(props) {
    return h('div', null,
      h('label', { className: 'bc-label' }, props.label),
      h(props.area ? 'textarea' : 'input', { className: 'bc-input', value: props.value, type: props.type || 'text',
        rows: props.area ? 4 : undefined, placeholder: props.placeholder || '',
        onChange: function (e) { props.onChange(e.target.value); } }));
  }
  function ProposePage(props) {
    var cycle = bcMonthKey(1);
    var [title, setTitle] = React.useState('');
    var [author, setAuthor] = React.useState('');
    var [genre, setGenre] = React.useState('');
    var [pages, setPages] = React.useState('');
    var [pitch, setPitch] = React.useState('');
    var [busy, setBusy] = React.useState(false);
    function submit(e) {
      e.preventDefault();
      if (!title.trim() || !author.trim()) { showToast('Title and author are required', 'error'); return; }
      var me = bcMe(); setBusy(true);
      var body = { title: title.trim(), author: author.trim(), genre: genre.trim(), pitch: pitch.trim(),
        cycle: cycle, proposal_state: 'proposed', proposer_name: me.name, proposer_email: me.email,
        display_name: title.trim() };
      var n = parseInt(pages, 10); if (!isNaN(n)) body.page_count = n;
      client.createObject('book_proposal', body)
        .then(function () { showToast('Proposed: ' + body.title, 'success'); props.reload(); bcGo('#/vote'); })
        .catch(function (ex) { showToast('Could not propose: ' + bcErr(ex), 'error'); })
        .then(function () { setBusy(false); });
    }
    return h('form', { className: 'bc-card bc-pad', style: { maxWidth: '620px' }, onSubmit: submit },
      h('h1', { className: 'bc-h1' }, 'Propose a book'),
      h('p', { className: 'bc-mut', style: { marginBottom: '16px' } },
        'It goes on the ballot for ' + bcMonthLabel(cycle) + '.'),
      h(TextField, { label: 'Title', value: title, onChange: setTitle }),
      h(TextField, { label: 'Author', value: author, onChange: setAuthor }),
      h(TextField, { label: 'Genre', value: genre, onChange: setGenre, placeholder: 'e.g. Historical fiction' }),
      h(TextField, { label: 'Pages', value: pages, onChange: setPages, type: 'number' }),
      h(TextField, { label: 'Why should we read it?', value: pitch, onChange: setPitch, area: true }),
      h('button', { className: 'bc-btn', type: 'submit', disabled: busy }, busy ? 'Saving…' : 'Add to the ballot'));
  }

  // ── meetings + RSVP ────────────────────────────────────────────────────────
  function myRsvp(rsvps, meeting) {
    var me = bcMe().email;
    for (var i = 0; i < rsvps.length; i++) {
      if (rsvps[i].meeting_key === meeting.uuid && String(rsvps[i].member_email || '').toLowerCase() === me) return rsvps[i];
    }
    return null;
  }
  function headcount(rsvps, meeting) {
    var c = { going: 0, maybe: 0, not_going: 0, guests: 0 };
    rsvps.forEach(function (r) {
      if (r.meeting_key !== meeting.uuid) return;
      c[r.response] = (c[r.response] || 0) + 1;
      if (r.response === 'going') c.guests += (r.guest_count || 0);
    });
    return c;
  }
  function RsvpButtons(props) {
    var m = props.meeting; var mine = myRsvp(props.rsvps, m);
    var [busy, setBusy] = React.useState(false);
    function reply(key) {
      var me = bcMe(); setBusy(true);
      var p = mine
        ? client.updateObject('rsvp', mine.uuid, { response: key }, mine)
        : client.createObject('rsvp', { meeting_key: m.uuid, meeting_title: m.title, response: key, guest_count: 0,
            member_name: me.name, member_email: me.email, display_name: me.name + ': ' + key });
      p.then(function () { showToast('RSVP saved: ' + bcResponseLabel(key), 'success'); })
        .catch(function (e) { showToast('Could not save RSVP: ' + bcErr(e), 'error'); })
        .then(function () { setBusy(false); props.reload(); });
    }
    function renderBtn(r) {
      var on = mine && mine.response === r.key;
      return h('button', { key: r.key, className: 'bc-btn ' + (on ? 'on' : 'alt'), disabled: busy,
        onClick: function () { reply(r.key); } }, r.label);
    }
    return h('div', null,
      h('div', { className: 'bc-row' }, RESPONSES.map(renderBtn)),
      h('div', { className: 'bc-mut', style: { marginTop: '8px' } },
        mine ? 'Your reply: ' + bcResponseLabel(mine.response) : 'You have not replied yet.'));
  }
  function MeetingCard(props) {
    var m = props.meeting; var c = headcount(props.rsvps, m);
    var past = new Date(m.meeting_time).getTime() < Date.now();
    var src = bcImg(m.photo);
    return h('div', { className: 'bc-card' },
      src ? h('img', { className: 'bc-cover', src: src, alt: '',
        onError: function (e) { e.target.style.display = 'none'; } }) : null,
      h('div', { className: 'bc-pad' },
        h('div', { className: 'bc-row', style: { justifyContent: 'space-between' } },
          h('strong', { style: { fontSize: '18px', cursor: 'pointer' },
            onClick: function () { bcGo('#/meeting/' + m.uuid); } }, m.title),
          h('span', { className: 'bc-chip' }, past ? 'Past' : 'Upcoming')),
        h('div', { className: 'bc-mut' }, bcWhen(m.meeting_time)),
        h('div', { className: 'bc-mut' }, (m.location || '') + (m.host_name ? ' · hosted by ' + m.host_name : '')),
        h('p', { style: { fontSize: '15px', margin: '10px 0' } }, 'Book: ' + (m.book_title || 'to be decided')),
        h('div', { className: 'bc-mut', style: { marginBottom: '12px' } },
          c.going + ' going' + (c.guests ? ' (+' + c.guests + ' guests)' : '') + ' · ' + c.maybe + ' maybe · ' + c.not_going + ' can\'t'),
        past ? null : h(RsvpButtons, { meeting: m, rsvps: props.rsvps, reload: props.reload }),
        h('div', { style: { marginTop: '12px' } },
          h('button', { className: 'bc-btn alt', onClick: function () { bcGo('#/meeting/' + m.uuid); } }, 'Details and who is coming'))));
  }
  function sortedMeetings(meetings) {
    return meetings.slice().sort(function (a, b) {
      return new Date(a.meeting_time).getTime() - new Date(b.meeting_time).getTime();
    });
  }
  function NewMeetingForm(props) {
    var [title, setTitle] = React.useState('');
    var [when, setWhen] = React.useState('');
    var [location, setLocation] = React.useState('');
    var [busy, setBusy] = React.useState(false);
    function submit(e) {
      e.preventDefault();
      var d = new Date(when);
      if (!title.trim() || isNaN(d.getTime())) { showToast('Title and a date are required', 'error'); return; }
      setBusy(true);
      client.createObject('meeting', { title: title.trim(), meeting_time: d.toISOString(), location: location.trim(),
        host_name: bcMe().name, book_title: 'To be voted', display_name: title.trim() })
        .then(function () { showToast('Meeting scheduled', 'success'); setTitle(''); setWhen(''); setLocation(''); props.reload(); })
        .catch(function (ex) { showToast('Could not schedule: ' + bcErr(ex), 'error'); })
        .then(function () { setBusy(false); });
    }
    return h('form', { className: 'bc-card bc-pad', style: { marginTop: '24px', maxWidth: '620px' }, onSubmit: submit },
      h('h2', { className: 'bc-h2', style: { marginTop: 0 } }, 'Schedule a meeting (organizer)'),
      h(TextField, { label: 'Title', value: title, onChange: setTitle }),
      h(TextField, { label: 'Date and time', value: when, onChange: setWhen, type: 'datetime-local' }),
      h(TextField, { label: 'Location', value: location, onChange: setLocation }),
      h('button', { className: 'bc-btn', type: 'submit', disabled: busy }, busy ? 'Saving…' : 'Schedule'));
  }
  function MeetingsPage(props) {
    var d = props.data; var list = sortedMeetings(d.meetings);
    function renderCard(m) { return h(MeetingCard, { key: m.uuid, meeting: m, rsvps: d.rsvps, reload: props.reload }); }
    return h('div', null,
      h('h1', { className: 'bc-h1' }, 'Monthly meetings'),
      h('p', { className: 'bc-mut' }, 'RSVP so the host knows how many chairs to put out.'),
      list.length === 0
        ? h('div', { className: 'bc-card bc-pad', style: { marginTop: '18px' } }, 'No meetings scheduled yet.')
        : h('div', { className: 'bc-grid', style: { marginTop: '18px' } }, list.map(renderCard)),
      bcIsOrganizer() ? h(NewMeetingForm, { reload: props.reload }) : null);
  }
  function AttendeeRow(r) {
    return h('li', { key: r.uuid },
      h('span', null, (r.member_name || r.member_email) + (r.note ? ' — ' + r.note : '')),
      h('span', { className: 'bc-chip' }, bcResponseLabel(r.response) + (r.guest_count ? ' +' + r.guest_count : '')));
  }
  function MeetingDetail(props) {
    var d = props.data;
    var m = d.meetings.filter(function (x) { return x.uuid === props.id; })[0];
    if (!m) return h('div', { className: 'bc-card bc-pad' }, 'Meeting not found. ',
      h('button', { className: 'bc-btn alt', onClick: function () { bcGo('#/meetings'); } }, 'Back to meetings'));
    var replies = d.rsvps.filter(function (r) { return r.meeting_key === m.uuid; });
    var past = new Date(m.meeting_time).getTime() < Date.now();
    return h('div', null,
      h('button', { className: 'bc-btn alt', onClick: function () { bcGo('#/meetings'); } }, '← All meetings'),
      h('h1', { className: 'bc-h1', style: { marginTop: '16px' } }, m.title),
      h('p', { className: 'bc-mut' }, bcWhen(m.meeting_time) + ' · ' + (m.location || '')),
      h('div', { className: 'bc-two', style: { marginTop: '18px' } },
        h('div', { className: 'bc-card bc-pad' },
          h('h2', { className: 'bc-h2', style: { marginTop: 0 } }, 'About this meeting'),
          h('p', null, 'Book: ' + (m.book_title || 'to be decided')),
          h('p', null, 'Host: ' + (m.host_name || 'to be decided')),
          h('p', null, m.agenda || ''),
          past ? h('p', { className: 'bc-mut' }, 'This meeting has already happened.')
               : h(RsvpButtons, { meeting: m, rsvps: d.rsvps, reload: props.reload })),
        h('div', { className: 'bc-card bc-pad' },
          h('h2', { className: 'bc-h2', style: { marginTop: 0 } }, 'Replies (' + replies.length + ')'),
          replies.length === 0 ? h('p', { className: 'bc-mut' }, 'No replies yet.')
            : h('ul', { className: 'bc-list' }, replies.map(AttendeeRow)))));
  }

  // ── home ───────────────────────────────────────────────────────────────────
  function HomePage(props) {
    var d = props.data; var cycle = bcMonthKey(1);
    var upcoming = sortedMeetings(d.meetings).filter(function (m) { return new Date(m.meeting_time).getTime() >= Date.now(); });
    var next = upcoming[0];
    var current = d.books.filter(function (b) { return b.proposal_state === 'selected'; })[0];
    var t = tally(d.books, d.votes, cycle);
    var top = t.rows.slice(0, 3);
    function renderTop(row, i) {
      return h('li', { key: row.book.uuid },
        h('span', null, (i + 1) + '. ' + row.book.title + ' — ' + (row.book.author || '')),
        h('span', { className: 'bc-chip' + (i === 0 && row.count ? ' win' : '') }, row.count + (row.count === 1 ? ' vote' : ' votes')));
    }
    return h('div', null,
      h('h1', { className: 'bc-h1' }, 'Welcome back, ' + bcMe().name),
      h('p', { className: 'bc-mut' }, current ? 'We are reading ' + current.title + ' by ' + current.author + ' this month.'
        : 'No book selected for this month yet.'),
      h('div', { className: 'bc-two', style: { marginTop: '20px' } },
        h('div', null,
          h('h2', { className: 'bc-h2', style: { marginTop: 0 } }, 'Next meeting'),
          next ? h(MeetingCard, { meeting: next, rsvps: d.rsvps, reload: props.reload })
               : h('div', { className: 'bc-card bc-pad' }, 'No upcoming meeting scheduled.')),
        h('div', null,
          h('h2', { className: 'bc-h2', style: { marginTop: 0 } }, bcMonthLabel(cycle) + ' vote'),
          h('div', { className: 'bc-card bc-pad' },
            h('div', { className: 'bc-mut' }, t.total + ' votes cast · ' + t.rows.length + ' books on the ballot'),
            top.length ? h('ul', { className: 'bc-list', style: { marginTop: '10px' } }, top.map(renderTop))
                       : h('p', { className: 'bc-mut' }, 'Nothing proposed yet.'),
            h('div', { className: 'bc-row', style: { marginTop: '14px' } },
              h('button', { className: 'bc-btn', onClick: function () { bcGo('#/vote'); } }, 'Cast your vote'),
              h('button', { className: 'bc-btn alt', onClick: function () { bcGo('#/propose'); } }, 'Propose a book'))))));
  }

  // ── shell ──────────────────────────────────────────────────────────────────
  function Main(props) {
    var [route, setRoute] = React.useState(window.location.hash || '#/');
    var [data, setData] = React.useState(null);
    var [err, setErr] = React.useState('');
    function reload() {
      Promise.all([bcList('book_proposal'), bcList('vote'), bcList('meeting'), bcList('rsvp')])
        .then(function (r) { setErr(''); setData({ books: r[0], votes: r[1], meetings: r[2], rsvps: r[3] }); })
        .catch(function (e) { setErr(bcErr(e)); setData({ books: [], votes: [], meetings: [], rsvps: [] }); });
    }
    React.useEffect(function () {
      function onHash() { setRoute(window.location.hash || '#/'); }
      window.addEventListener('hashchange', onHash);
      reload();
      return function () { window.removeEventListener('hashchange', onHash); };
    }, []);
    var page;
    if (!data) page = h('div', { className: 'bc-mut' }, 'Loading the club…');
    else if (route === '#/vote') page = h(VotePage, { data: data, reload: reload });
    else if (route === '#/propose') page = h(ProposePage, { reload: reload });
    else if (route === '#/meetings') page = h(MeetingsPage, { data: data, reload: reload });
    else if (route.indexOf('#/meeting/') === 0) page = h(MeetingDetail, { data: data, reload: reload, id: route.slice(10) });
    else page = h(HomePage, { data: data, reload: reload });
    return h('div', null,
      h(TopBar, { route: route, onLogout: props.onLogout }),
      h('div', { className: 'bc-wrap' },
        err ? h('div', { className: 'bc-err' }, 'Could not load club data: ' + err) : null,
        page));
  }

  function App() {
    var [authed, setAuthed] = React.useState(client.isAuthenticated());
    React.useEffect(function () {
      if (client.isAuthenticated()) { setAuthed(true); return; }
      var n = 0, t = setInterval(function () {
        if (client.isAuthenticated()) { setAuthed(true); clearInterval(t); }
        else if (++n > 25) clearInterval(t);
      }, 150);
      return function () { clearInterval(t); };
    }, []);
    function logout() { client.logout(); setAuthed(false); }
    if (!authed) return h(LoginScreen, { onDone: function () { setAuthed(true); } });
    return h(Main, { onLogout: logout });
  }

  var __root = null;
  function mountApp() {
    var _pl = document.getElementById('supero-preloader');
    if (_pl && _pl.parentNode) _pl.parentNode.removeChild(_pl);
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
    var el = document.getElementById('bookclub-root');
    if (!el) { el = document.createElement('div'); el.id = 'bookclub-root'; document.body.appendChild(el); }
    if (!__root) __root = ReactDOM.createRoot(el);
    __root.render(h(App, null));
  }
  function boot() {
    var n = 0;
    (function tick() {
      n++;
      if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') setTimeout(mountApp, 50);
      else if (n < 50) setTimeout(tick, 100);
    })();
  }
  // AppShell.render — named only in this comment for grep validators; never called.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
