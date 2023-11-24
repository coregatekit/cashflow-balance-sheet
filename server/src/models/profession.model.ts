import { Schema, model } from 'mongoose';

type ProfessionType = {
  profession: string;
  income: {
    salary: number;
  },
  expenses: {
    taxes: number;
    home_mortgage_payment: number;
    school_loan_payment: number;
    car_loan_payment: number;
    credit_card_payment: number;
    other_expenses: number;
    per_child_expense: number;
  },
  assets: {
    saving: number;
  },
  liabilities: {
    home_mortgage: number;
    school_loans: number;
    car_loans: number;
    credit_card_debt: number;
  }
}

const professionSchema = new Schema<ProfessionType>({
  profession: { type: String, required: true },
  income: {
    salary: { type: Number, required: true },
  },
  expenses: {
    taxes: { type: Number, required: true },
    home_mortgage_payment: { type: Number, required: true },
    school_loan_payment: { type: Number, required: true },
    car_loan_payment: { type: Number, required: true },
    credit_card_payment: { type: Number, required: true },
    other_expenses: { type: Number, required: true },
    per_child_expense: { type: Number, required: true },
  },
  assets: {
    saving: { type: Number, required: true },
  },
  liabilities: {
    home_mortgage: { type: Number, required: true },
    school_loans: { type: Number, required: true },
    car_loans: { type: Number, required: true },
    credit_card_debt: { type: Number, required: true },
  }
});

const Profession = model<ProfessionType>('professions', professionSchema);

export default Profession;
