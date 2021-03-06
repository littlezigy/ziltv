import { postComment } from '../../src/api/comment.js';
import { faker } from '../dependencies/faker.js';
import { loginHelper } from '/tests/helpers/index.js';

describe('Comment api', function() {
    it('Fetch comments');

    it('Post comment', function() {
        const commentText = faker.lorem.paragraph();
        const videoID = 4
        const userID = 3;

        return loginHelper()
        .then(() => postComment(videoID, commentText, userID))
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');
        });
    });
});

