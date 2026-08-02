(() => {
  const teams = {
    "YSR-04E & niu":"Team Resilience","Satanic & Noticed":"Team Vision","Yuma & Wisper":"LGD Gaming","watson & DM":"Team Yandex",
    "Kiritych & MieRo":"BoomBoys","skiter & ATF":"Team Falcons","Ame & Xxs":"Xtreme Gaming","Nightfall & Ws":"Aurora Gaming",
    "Pure & 33":"Iron Wing","Yatoro & Collapse":"Team Spirit","shiro & Bach":"Vici Gaming","Ghost & Fayde":"GamerLegion",
    "miCKe & Ace":"Team Liquid","ssnovv1 & Corrupted":"HULIGANI","Natsumi & Raven":"OG","SumaiL & Davai":"Nigma Galaxy",
    "Nisha":"Team Liquid","Malr1ne":"Team Falcons","gpk":"BoomBoys","lorenof":"Nigma Galaxy","Echozz":"Team Resilience",
    "Mikoto":"Aurora Gaming","bzm":"Iron Wing","No[o]ne":"Team Vision","Xm":"Vici Gaming","Tailung":"LGD Gaming",
    "Larl":"Team Spirit","CHIRA_JUNIOR":"Team Yandex","RCY":"GamerLegion","NothingToSay":"Xtreme Gaming","Mirage`":"HULIGANI","Yopaj":"OG",
    "Thiolicor & KJ":"LGD Gaming","Saksa & Malady":"Team Yandex","Tims & skem":"OG","Cr1t- & Sneyking":"Team Falcons",
    "fy & xNova":"Xtreme Gaming","Ari & Whitemon":"Iron Wing","Mira & kaori":"Aurora Gaming","OmaR & GH":"Nigma Galaxy",
    "Boxi & tofu":"Team Liquid","rue & not me":"Team Spirit","XinQ & y`":"Vici Gaming","9Class & Dukalis":"Team Vision",
    "planet & zzq":"Team Resilience","Save- & Kataomi":"BoomBoys","Bignum & Speeed":"GamerLegion","sayuw & RESPECT":"HULIGANI"
  };

  // Entries still absent from the React teamByPlayerId map.
  // Restricting winner-card hydration to this set prevents duplicate teams.
  const missingWinnerTeams = new Set([
    "YSR-04E & niu",
    "Mira & kaori",
    "OmaR & GH",
    "XinQ & y`",
    "9Class & Dukalis",
    "planet & zzq",
    "Save- & Kataomi",
    "Bignum & Speeed",
    "sayuw & RESPECT"
  ]);

  function logo(team, size) {
    const span = document.createElement('span');
    span.className = `team-logo team-logo-${size}`;
    span.title = team;
    span.setAttribute('role', 'img');
    span.setAttribute('aria-label', team);
    span.dataset.teamMapInjected = 'true';
    return span;
  }

  function hydrateAlternative(row) {
    const name = row.querySelector('strong')?.textContent?.trim();
    const team = name && teams[name];
    if (!team || row.querySelector('.team-logo')) return;
    const rank = row.querySelector('.rank-number');
    if (!rank) return;
    rank.insertAdjacentElement('afterend', logo(team, 'sm'));
    const info = row.querySelector('div');
    if (info && !info.querySelector('.team-label')) {
      const label = document.createElement('small');
      label.className = 'team-label';
      label.textContent = team;
      label.dataset.teamMapInjected = 'true';
      const confidence = info.querySelector('small');
      info.insertBefore(label, confidence || null);
    }
  }

  function hydrateMissingWinner(card) {
    const name = card.querySelector('.winner-name')?.textContent?.trim();
    if (!name || !missingWinnerTeams.has(name)) return;

    const team = teams[name];
    const identity = card.querySelector('.winner-identity');
    if (!team || !identity) return;
    if (identity.querySelector('.team-logo') || identity.querySelector('.winner-team')) return;

    identity.insertBefore(logo(team, 'lg'), identity.firstChild);
    const text = identity.querySelector('div');
    if (text) {
      const label = document.createElement('div');
      label.className = 'winner-team';
      label.textContent = team;
      label.dataset.teamMapInjected = 'true';
      text.appendChild(label);
    }
  }

  function hydrate() {
    document.querySelectorAll('.alternative-row').forEach(hydrateAlternative);
    document.querySelectorAll('.winner-card').forEach(hydrateMissingWinner);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; hydrate(); });
  };
  new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrate);
  else hydrate();
})();