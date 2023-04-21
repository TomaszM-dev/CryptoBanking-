const now = new Date();

export class User {
  constructor(
    fullName,
    userName,
    password,
    birthDate,
    accountCreated,
    transactions
  ) {
    (this.fullName = fullName),
      (this.userName = userName),
      (this.password = password),
      (this.birthDate = birthDate),
      (this.accountCreated = accountCreated),
      (this.transactions = transactions);
  }

  calcAge() {
    this.age = now.getFullYear() - this.birthDate[0];
    return this.age;
  }

  calcBalance() {
    let amounts = [];
    this.transactions.forEach((t) => {
      amounts.push(t.amount);
    });

    this.balance = amounts.reduce(function (acc, cur) {
      return acc + cur;
    }, 0);

    return this.balance;
  }

  calcValid() {
    const getYearRegistered = new Date(this.accountCreated).getUTCFullYear();
    const getMonthRegistered = new Date(this.accountCreated).getUTCMonth() + 1;

    // account is valid for 5 years
    const validTillYear = getYearRegistered + 5;
    this.validTill = getMonthRegistered + "/" + validTillYear;

    return this.validTill;
  }

  calcNumbers() {
    this.cardNumber = Math.floor(
      10000000000000 + Math.random() * 1600000000000000
    );
    this.ccv = Math.floor(100 + Math.random() * 900);
    return this.cardNumber, this.ccv;
  }

  cardNumberLayout() {
    const set1 = this.cardNumber.toString().slice(0, 4);
    const set2 = this.cardNumber.toString().slice(4, 8);
    const set3 = this.cardNumber.toString().slice(8, 12);
    const set4 = this.cardNumber.toString().slice(12, 16);
    const cardArray = [set1, set2, set3, set4];

    const html = `${cardArray[0]} <span></span> ${cardArray[1]} 
    <span></span> ${cardArray[2]} <span></span> ${cardArray[3]} `;
  }
}

const userTomson = new User(
  "Tomasz Malocha",
  "tom123",
  "123",
  [2000, 8, 11],
  "2022-11-03T03:13:34Z",
  [
    {
      type: "deposit",
      amount: 1200,
      date: "2023-01-25T23:27:39Z",
      category: "music",
      company: "Spotify",
    },
    {
      type: "withdrawal",
      amount: -200,
      date: "2023-02-02T23:27:39Z",
      category: "Morgage",
      company: "Geacko",
    },
    {
      type: "deposit",
      amount: 4000,
      date: "2023-04-11T23:27:39Z",
      category: "Salary",
      company: "Aviso",
    },
    {
      type: "withdrawal",
      amount: -1200,
      date: "2022-05-22T23:27:39Z",
      category: "Electrisity",
      company: "Elso",
    },
  ]
);

userTomson.calcAge();
userTomson.calcBalance();
userTomson.calcNumbers();
userTomson.calcValid();
userTomson.cardNumberLayout();

const userMark = new User(
  "Mark Smith",
  "mark123",
  123,
  [2001, 12, 8],
  "2021-11-03T03:13:34Z",
  [
    {
      type: "deposit",
      amount: 1200,
      date: "2023-01-25T23:27:39Z",
      category: "music",
      company: "Spotify",
    },
    {
      type: "withdrawal",
      amount: -700,
      date: "2023-02-02T23:27:39Z",
      category: "Morgage",
      company: "Geacko",
    },
    {
      type: "deposit",
      amount: 6000,
      date: "2023-05-11T23:27:39Z",
      category: "Salary",
      company: "Aviso",
    },
    {
      type: "withdrawal",
      amount: -1200,
      date: "2022-05-22T23:27:39Z",
      category: "Electrisity",
      company: "Elso",
    },
  ]
);

userMark.calcAge();
userMark.calcBalance();
userMark.calcNumbers();
userMark.calcValid();

export const accounts = [userTomson, userMark];
