const state = {};

const instantiateContract = (web3) => {
    state.dao = new web3.eth.Contract(DAO.abi, DAO.networks["5777"].address);
    state.token = new web3.eth.Contract(
        NobelToken.abi,
        NobelToken.networks["5777"].address
    );
};

const startListening = () => {
    listenToAccountChange();
    listenToNewProposalCreated();
    listenToNewOwnerAdded();
    listenToCampaignDeployed();
    listenToMasterCopyUpdated();
    listenToVoteCasted();
};

const updateAccountState = async (address) => {
    state.currentAccount = address;
    await changeView(state.currentAccount);
};

getWeb3().then(async (data) => {
    console.log(window.ethereum);
    state.web3 = data;
    instantiateContract(state.web3);
    state.accounts = await state.web3.eth.getAccounts();
    await updateAccountState(state.accounts[0]);
    startListening();
    state.campaigns = await getPastEvents("CampaignDeployed", state.dao)();
});
