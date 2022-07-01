import server from './server.js';

export function addBadgeConfig(data) {
    const badgeImg = data.badgeImg || data.badgeImage;
    const nftAddress = data.nftAddress;
    const specifyTokens = data.specifyTokens;
    const tokenIDs = data.tokenIDs;
    const creator = data.creatorID || 8;

    const body = {
        badgeImg,
        nftAddress,
        specifyTokens,
        tokenIDs,
        creator
    }
    return server('badge', body)
        .then(res => {
            return res;
        });
}

export function getBadgeConfig(creatorID) {
    if(creatorID)
        return server('creator/' + creatorID + '/badges')
    else return server('badges');
}
