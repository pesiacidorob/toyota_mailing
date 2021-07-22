import { User, SearchFilter } from "../types";

const SearchFilterOps = {
  equal: "_eq",
  greaterThan: "_gt",
  lessThan: "_lt",
  greaterThanOrEqual: "_gte",
  lessThanOrEqual: "_lte",
  contain: "_like",
  startsWith: "_startsWith",
  endsWith: "_endsWith"
};

const SESSION_TOKEN_KEY = "vue-crm-token";
const SESSION_USER_KEY = "vue-crm-user";

export function setToken(token: string): void {
  if (sessionStorage) {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  }
}

export function setUser(userData: string): void {
  if (sessionStorage) {
    sessionStorage.setItem(SESSION_USER_KEY, userData);
  }
}

export function getToken(): string {
  let token = "";
  if (sessionStorage) {
    const _token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    token = _token ? _token : token;
  }
  return token;
}

export function getUser(): User {
  let user = {} as User;
  if (sessionStorage) {
    const userData = sessionStorage.getItem(SESSION_USER_KEY);
    user = userData ? (JSON.parse(userData) as User) : ({} as User);
  }
  return user;
}

export function cleanSession() {
  if (sessionStorage) {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
  }
}

export function capFirstLetter(s: string) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export function clearSearchFilters(searchFilter: SearchFilter) {
  if (searchFilter) {
    if (searchFilter.filters) delete searchFilter.filters;

    Object.keys(searchFilter).forEach(filter => {
      if (searchFilter[filter]) {
        Object.keys(searchFilter[filter]).forEach(prop => {
          searchFilter[filter][prop] = null;
        });
      }
    });
  }
}

export function buildSearchFilters(searchFilter: SearchFilter) {
    const filters = [];
  if (searchFilter) {
    // searchFilter.
    Object.keys(searchFilter).forEach(filter => {
      if (filter !== "filters") {
        Object.keys(searchFilter[filter]).forEach(propName => {
          console.log(`propName ${propName} `)
          if (propName && searchFilter[filter]
            && searchFilter[filter][propName]) {
            filters.push({
              property: propName,
              op: SearchFilterOps[filter],
              val: searchFilter[filter][propName],
            });
          }
        });
      }
    });
  }
  return filters
}

export function buildJsonServerQuery (filters: TODO){ // (searchVm: TODO) {
  let filterQuery = "";
  if (filters && filters.length > 0) {
    filterQuery = filters.reduce((prev: '', f: TODO) => {
      // eslint-disable-next-line no-sequences
      if (f.val && f.val !== "", f.val !== null && f.val !== undefined) {
        let qString = ''
        qString += f.property;
        qString += f.op;
        qString += "=";
        qString += f.val;
        prev += prev !== '' ? `&${qString}` : `${qString}`
      }
      return prev
    }, '');
  }
  return filterQuery;
}

const filterFn = (op: string, value: TODO) => (prop: string,  data:TODO) => {
  let propName =  ""
  switch (op) {
    case SearchFilterOps.equal:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.equal))
      return data[propName] === value
    case SearchFilterOps.contain:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.contain))
      return data[propName].toLowerCase().includes(value.toLowerCase())
    case SearchFilterOps.startsWith:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.startsWith))
      return data[propName].toLowerCase().startsWith(value.toLowerCase())
    case SearchFilterOps.endsWith:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.endsWith))
      return data[propName].toLowerCase().endsWith(value.toLowerCase())
    case SearchFilterOps.greaterThan:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.greaterThan))
      return  parseFloat(data[propName]) > parseFloat( value)
    case SearchFilterOps.lessThan:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.lessThan))
      return parseFloat(data[propName] ) < parseFloat(value)
    case SearchFilterOps.greaterThanOrEqual:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.greaterThanOrEqual))
      return  parseFloat(data[propName]) >=parseFloat( value)
    case SearchFilterOps.lessThanOrEqual:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.lessThanOrEqual))
      return parseFloat(data[propName] )<= parseFloat(value)
  }
}

export function getSeachFilters(parsedQs: { [key: string]: TODO }) {
  // Search Query will look like follows
  // firstname_like=abc&email_like=abc&price_ge=10
  const filters = Object.keys(parsedQs).reduce(
    (prev: TODO, k: string) => {
      const prop = k.slice(0, k.indexOf('_'))
      const op = k.slice(k.indexOf('_'))
      const compVal = parsedQs[k]
      if (prop !== '') {
        prev[k] = filterFn(op, compVal)
      }
      return prev
    }, {})
  return filters;
}

// export function isValidRewards(rewards: number) {
//   if (rewards < 0 || rewards > 9999) {
//     return "Reward is required. It must be bewteen 0 and 9999";
//   }
//   return true;
// }

// export function isValidEmail(email: string) {
//   /* eslint-disable no-useless-escape */
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (email && !re.test(email)) return "Email is invalid.";
//   return true;
// }

export function getMailInbox (filters: TODO){ // (searchVm: TODO) {
  let filterQuery = "";
  const Imap = require('imap'), inspect = require('util').inspect;

  console.log('=========== getMailInbox =============')

  let getEmailFromInbox = (mailServer) => {
    mailServer.openBox('INBOX', true, function (err, box) {
      if (err) throw err;
      // we can define range '1:3'
      let f = mailServer.seq.fetch('1:*', {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
        struct: true
      });
      f.on('message', function (msg, seqno) {
        console.log('Message #%d', seqno);
        let prefix = '(#' + seqno + ') ';
        msg.on('body', function (stream, info) {
          let buffer = '';
          stream.on('data', function (chunk) {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function () {
            console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          });
        });
      });
      f.once('error', function (err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function () {
        console.log('Done fetching all messages!');
        //mailServer.end();
      });
    });
  }

  let createLabel = (mailServer, labelName) => {
    mailServer.addBox(labelName, (err) => {});
    console.log('message', 'New Label or Box Created');
  }

  let getMailboxStatusByName = (mailServer, inboxName) => {
    mailServer.status(inboxName, (err, mailbox) => {
      console.log('message', mailbox);
    });
    console.log('message', 'Label or Box Status');
  }

  let getMailBoxLabels = (mailServer) => {
    mailServer.getBoxes((error, mailbox) => {
      console.log('message', mailbox);
    })
  }

  let deleteLabel = (mailServer, labelName) => {
    mailServer.delBox(labelName, (error) => {})
    console.log('message', 'Label or Box removed');
  }

  let mailServer1 = new Imap({
    user: 'max628tes@gmail.com',
    password: 'kjuj1130okok',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false
    },
    authTimeout: 3000
  }).once('error', function (err) {
    console.log('Source Server Error:- ', err);
  });
  mailServer1.once('ready', function () {
    mailServer1.openBox('INBOX', true, function (err, box) {
      if (err) throw err;
      console.log('message', 'server1 ready');
    });

    // mail operation
    getMailBoxLabels(mailServer1);
    getEmailFromInbox(mailServer1)
    createLabel(mailServer1, "demo-label1");
    deleteLabel(mailServer1, "demo-label1");
    getMailboxStatusByName(mailServer1, "INBOX");
  })
  mailServer1.connect();
//   debugger
  return filterQuery;
}
