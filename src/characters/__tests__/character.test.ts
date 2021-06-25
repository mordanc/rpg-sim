import { Character } from '../character';

describe('Character', () => {
  it('should return netral opinion for newly met or unmet characters', () => {
    const bob = new Character('bob', 'happy');
    // const alice = new Character('alice', 'happy');
    const opinionBeforeMeeting = bob.getOpinionOfCharacter('alice');

    bob.meetCharacter('alice');

    const opinionAfterMeeting = bob.getOpinionOfCharacter('alice');

    expect(opinionBeforeMeeting).toBe('neutral');
    expect(opinionAfterMeeting).toBe('neutral');
  });

  it('should return higher Attitude of character when their opinion is higher than 30', () => {
    const bob = new Character('bob', 'happy');
    bob.meetCharacter('alice');

    const opinionBefore = bob.getOpinionOfCharacter('alice');
    bob.raiseOpinionOfCharacter('alice', 30);
    const opinionAfter = bob.getOpinionOfCharacter('alice');

    expect(opinionBefore).toEqual('neutral');
    expect(opinionAfter).toEqual('happy');
  });

  it('should return lower Attitude of character when their opinion is lower than -30', () => {
    const bob = new Character('bob', 'happy');
    bob.meetCharacter('alice');

    const opinionBefore = bob.getOpinionOfCharacter('alice');
    bob.lowerOpinionOfCharacter('alice', 30);
    const opinionAfter = bob.getOpinionOfCharacter('alice');

    expect(opinionBefore).toEqual('neutral');
    expect(opinionAfter).toEqual('angry');
  });
});
