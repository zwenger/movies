const request = require('supertest')('http://localhost:5000/api');
const assert = require('chai').assert;

const movie = { "name": "Marconeitor 3000", "rating": "1", "time": ["1"] }
const movie2 = { "name": "3000", "rating": "1", "time": ["1"] }
let id;
describe('movies API', () => {
    it('POST /movie', () => {
        // Make a GET request to the users route 
        return request
            .post('/movie').send(movie).expect(201).then((res)=> id=res.body.id)
    });
    it('POST /movie2', () => {
        return request
            .post('/movie').send(movie2).expect(201)
    });
    it('GET /movie', () => {
        // Make a GET request to the users route 
        return request
            .get('/movie/'+id)
            .expect(200)
            .then((res) => {
                // assert data bieng return to not be empty
                assert(res.body.data.name == movie.name, 'Failed, not equals name!!');
            });
    });
    it('DELETE /movie/:id', () => {
        // Make a GET request to the users route 
        return request
            .delete('/movie/'+id)
            .then((res) => {
                assert(res.body.data.name == movie.name, 'Failed, not equals name!!');
            });
    });
});

