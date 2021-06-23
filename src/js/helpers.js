const requestCampaign = async (inputs) => {
    await addProposal(inputs)
    console.log("Request Campaign");
};

const proposalApprove = async () => {
    await getProposals();
    console.log("Proposal Approve");
};

const proposalReject = async () => {
    console.log("Proposal Reject");
};