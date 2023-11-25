import Profession from '../models/profession.model';

async function findAllProfessions() {
  return await Profession.find().sort({ profession: 1 });
}

export {
  findAllProfessions,
};
