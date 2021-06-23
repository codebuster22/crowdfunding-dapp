const getTotalOwners = async () => {
    const totalOwners = await state.dao.methods.totalOwners().call();
    console.log(totalOwners);
};

const addProposal = async (inputs) => {
    await state.dao.methods.addProposal(...inputs).send({
        from: state.accounts[0],
        gas: 3000000,
        gasPrice: 200000000
    });
}

const getProposals = async () => {
    const proposals = await state.dao.methods.getProposals().call();
    console.log(proposals);
}
