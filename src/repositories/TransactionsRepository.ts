import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const getIncome = await this.find({
      where: { type: 'income' },
    });

    const getOutcome = await this.find({
      where: { type: 'outcome' },
    });

    const income = getIncome.reduce((accumulator, item) => {
      return accumulator + Number(item.value);
    }, 0);

    const outcome = getOutcome.reduce((accumulator, item) => {
      return accumulator + Number(item.value);
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
