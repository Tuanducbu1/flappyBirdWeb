import { db } from '../firebase-config.js';
import { collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export class Leaderboard {
    constructor() {
        this.collectionName = 'scores';
        this.scores = [];
    }

    async addScore(name, score) {
        try {
            await addDoc(collection(db, this.collectionName), {
                name: name,
                score: score,
                timestamp: Date.now()
            });
            console.log("Score added!");
            return true;
        } catch (e) {
            console.error("Error adding score: ", e);
            return false;
        }
    }

    async getTopScores(limitCount = 5) {
        const q = query(
            collection(db, this.collectionName),
            orderBy("score", "desc"),
            limit(limitCount)
        );

        try {
            const querySnapshot = await getDocs(q);
            this.scores = [];
            querySnapshot.forEach((doc) => {
                this.scores.push(doc.data());
            });
            return this.scores;
        } catch (e) {
            console.error("Error getting scores: ", e);
            return [];
        }
    }
}
