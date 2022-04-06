const Person = require('../classes/person');

const tester = new Person('tester');

test('Tester bets 5, make his chips on table = 5', () => {
  tester.bet(5);
  const result = tester.getBet();
  expect(result).toBe(5);
});

test('Tester shuffles 4 cards then he shoule have 4 cards', () => {
  const testerCards = tester.shuffle(4);
  const result = testerCards.length;
  expect(result).toBe(4);
});

test('Tester bets 5 and wins then he shoule have 10 chips in wallet', () => {
  tester.bet(5);
  tester.win();
  const result = tester.getWallet();
  expect(result).toBe(10);
});

test('After tester has 10 chips, then bets 5 and loses so he shoule have 5 chips in wallet', () => {
  tester.bet(5);
  tester.lose();
  const result = tester.getWallet();
  expect(result).toBe(5);
});