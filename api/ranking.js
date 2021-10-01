const skill = require('ts-trueskill');
let ranks = {};
const matches = [{ winners: ["BSZ", "KMA"], losers: ["PKU", "PLA"], date: 1 },
{ winners: ["BSZ", "KMA"], losers: ["ABC", "PLA"], date: 2 },
{ winners: ["BSZ", "XYZ"], losers: ["PKU", "PLA"], date: 3 }]

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ result: processMatch(matches[0]) })
    };
}

function processMatch(match) {
    let winning_team_ratings = match.winners.map(get_rating);
    let losing_team_ratings = match.losers.map(get_rating);

    // Assumes the first team was the winner by default
    let [updated_winning_team_ratings, updated_losing_team_ratings] = skill.rate([winning_team_ratings, losing_team_ratings]);

    ranks = updateRanks(updated_winning_team_ratings, match.winners, ranks);
    ranks = updateRanks(updated_losing_team_ratings, match.losers, ranks);

    return [{ winners: updated_winning_team_ratings.map(formatRank) }, { losers: updated_losing_team_ratings.map(formatRank) }, { ranks: ranks }];
}

get_rating = function (user_tag) {
    if (user_tag in ranks) {
        return ranks[user_tag];
    }
    return new skill.Rating();
}

function formatRank(rank) {
    return { rank: skill.expose(rank), mu: rank.mu, sigma: rank.sigma }
}

function updateRanks(group_ratings, tags, ranks) {
    for (let i = 0; i < group_ratings.length; i++) {
        ranks[tags[i]] = group_ratings[i]
    }
    return ranks;
}