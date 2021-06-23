const listenToNewOwnerAdded = () => {
    state.dao.events.NewOwnerAdded().on('data', (event) => {
        console.log(event);
    }).on('error', (error, data) => {
        console.log(error, data);
    });
};

const listenToNewProposalCreated = () => {
    state.dao.events.NewProposalCreated().on('data', (event) => {
        const {manager, proposalId} = event.returnValues;
        alert(`Congratulations! New Campaign proposal have been created with ID - ${proposalId} and the manager is ${manager}`)
    }).on('error', (error, data) => {
        console.log(error, data);
    });
};

const listenToVoteCasted = () => {
    state.dao.events.VoteCasted().on('data', (event) => {
        console.log(event)
    }).on('error', (error, data) => {
        console.log(error, data);
    });
};

const listenToCampaignDeployed = async () => {
    state.dao.events.CampaignDeployed().on('data', (event) => {
        console.log(event)
    }).on('error', (error, data) => {
        console.log(error, data);
    });
};

const listenToMasterCopyUpdated = async () => {
    state.dao.events.MasterCopyUpdated().on('data', (event) => {
        console.log(event)
    }).on('error', (error, data) => {
        console.log(error, data);
    });
};
