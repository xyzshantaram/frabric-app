import GraphQLAPIMapper from '../graphQLAPIMapper'
import Asset  from '../../../../models/asset'
import Proposal  from '../../../../models/proposal'
import Vote  from '../../../../models/vote'

class TheGraphAPIMapper extends GraphQLAPIMapper {
  mapAssets(rawAssets) {
    if (!rawAssets || rawAssets.length < 1) {
      return []
    }

    return rawAssets
      .map(rawAsset => {
        const proposals = this.mapProposals(rawAsset.proposals)

        return new Asset(
          rawAsset.id,
          rawAsset.mintedAsset.dataURI,
          rawAsset.contract,
          rawAsset.symbol,
          rawAsset.numOfShares,
          proposals
        )
      })
  }

  mapProposals(rawProposals) {
    if (!rawProposals || rawProposals.length < 1) {
      return []
    }

    return rawProposals
      .map(rawProposal => {
        const votes = this.mapVotes(rawProposal.votes)

        return new Proposal(
          rawProposal.id,
          rawProposal.creator,
          rawProposal.dataURI,
          votes
        )
      })
  }

  mapVotes(rawVotes) {
    if (!rawVotes || rawVotes.length < 1) {
      return []
    }

    return rawVotes
      .map(rawVote => {
        return new Vote(
          rawVote.id,
          rawVote.voter,
          rawVote.voteType,
          rawVote.count
        )
      })
  }
}

export default TheGraphAPIMapper