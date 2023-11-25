import { Schema, model } from 'mongoose';

type ProfessionType = {
  profession: string;
  income: {
    salary: number;
  };
  expenses: [
    {
      name: string;
      amount: number;
    },
  ];
  assets: {
    saving: number;
  };
  liabilities: {
    home_mortgage: number;
    school_loans: number;
    car_loans: number;
    credit_card_debt: number;
  };
};

const professionSchema = new Schema<ProfessionType>({
  profession: { type: String, required: true },
  income: {
    salary: { type: Number, required: true },
  },
  expenses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  assets: {
    saving: { type: Number, required: true },
  },
  liabilities: {
    home_mortgage: { type: Number, required: true },
    school_loans: { type: Number, required: true },
    car_loans: { type: Number, required: true },
    credit_card_debt: { type: Number, required: true },
  },
});

const Profession = model<ProfessionType>('professions', professionSchema);

export default Profession;
