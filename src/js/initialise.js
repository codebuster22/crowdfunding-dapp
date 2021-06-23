const state = {};

const instantiateContract = (web3) => {
    state.dao = new web3.eth.Contract(DAO.abi, DAO.networks['5777'].address);
    state.token = new web3.eth.Contract(NobelToken.abi, NobelToken.networks['5777'].address);
}

const startListening = () => {
    listenToNewProposalCreated();
    listenToNewOwnerAdded();
    listenToCampaignDeployed();
    listenToMasterCopyUpdated();
    listenToVoteCasted();
}

getWeb3().then(
    async (data)=>{
        state.web3 = data;
        state.accounts = await state.web3.eth.getAccounts();
        instantiateContract(state.web3);
        startListening();
    }
);
