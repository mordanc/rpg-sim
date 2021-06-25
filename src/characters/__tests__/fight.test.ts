import { generateCharacter } from '../../characterGeneration/generateWorkers';
import { Character } from '../character';
import { groupFight, isGroupDead, numWoundedInGroup } from '../fight';

describe('fight', () => {
  describe('isGroupDead', () => {
    it('should return false when all characters in group have full health', () => {
      const group = [
        generateCharacter(),
        generateCharacter(),
        generateCharacter(),
      ];

      const result = isGroupDead(group);

      expect(result).toEqual(false);
    });
    it('should return true when all characters in group have no health', () => {
      const fighters = [
        new Character('bob', 'happy', 10),
        new Character('bob', 'happy', 10),
        new Character('bob', 'happy', 10),
      ];

      const workers = [
        generateCharacter(),
        generateCharacter(),
        generateCharacter(),
      ];

      groupFight(fighters, workers);
      const result = isGroupDead(workers);

      expect(result).toEqual(true);
    });
  });
  //   describe('numWoundedInGroup', () => {
  // it('should fail', () => {
  //   const fighters = [
  //     new Character('bob', 'happy', 10),
  //     new Character('bob', 'happy', 10),
  //     new Character('bob', 'happy', 10),
  //   ];
  //   const workers = [
  //     generateCharacter(),
  //     generateCharacter(),
  //     generateCharacter(),
  //   ];
  //   groupFight(fighters, workers);
  //   const result = numWoundedInGroup(workers);
  //   expect(result).toEqual(workers.length);
  // });
  //   });
});
