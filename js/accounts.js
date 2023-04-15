const now = new Date();

export const userTomas = {
  firstName: "tomek",
  lastName: "Smith",
  userName: "tom123",
  password: "123",
  birthDate: [2000, 8, 11],
  accountCreated: "2022-11-03T03:13:34Z",

  transactions: [
    {
      type: "deposit",
      amount: 1200,
      date: "2023-02-25T23:27:39Z",
      category: "music",
      company: "Spotify",
    },
    {
      type: "withdrawal",
      amount: -200,
      date: "2023-01-22T23:27:39Z",
      category: "Fee",
      company: "Cryptobank",
    },
  ],
};

export const userMark = {
  firstName: "Mark",
  lastName: "Smith",
  userName: "mark123",
  password: "123",
  birthDate: [2000, 8, 11],
  accountCreated: "2022-11-03T03:13:34Z",

  transactions: [
    {
      type: "deposit",
      amount: 1200,
      date: "2023-02-25T23:27:39Z",
      category: "music",
      company: "Spotify",
    },
    {
      type: "withdrawal",
      amount: -200,
      date: "2023-01-22T23:27:39Z",
      category: "Fee",
      company: "Cryptobank",
    },
  ],

  calcAge: function () {
    this.age = now.getFullYear() - this.birthDate[0];
    return this.age;
  },
  calcBalance: function () {
    this.balance = this.transactions.reduce(function (acc, cur, i, arr) {
      return acc + cur;
    }, 0);
    return this.balance;
  },
  calcValid: function () {
    const getYearRegistered = new Date(this.accountCreated).getUTCFullYear();
    const getMonthRegistered = new Date(this.accountCreated).getUTCMonth() + 1;

    // account is valid for 5 years
    const validTillYear = getYearRegistered + 5;
    this.validTill = getMonthRegistered + "/" + validTillYear;

    return this.validTill;
  },
  calcNumbers: function () {
    this.cardNumber = Math.floor(
      10000000000000 + Math.random() * 1600000000000000
    );
    this.ccv = Math.floor(100 + Math.random() * 900);
    return this.cardNumber, this.ccv;
  },
};

userMark.calcValid();
userMark.calcBalance();
userMark.calcAge();
userMark.calcNumbers();

export const accounts = [userMark, userTomas];

export let currentAccount;
