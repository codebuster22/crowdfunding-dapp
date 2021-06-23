const proposalNameInput  = document.getElementById('proposalName');
const documentHashInput  = document.getElementById('documentHash');
const maximumTargetInput = document.getElementById('maximumTarget');
const minimumTargetInput = document.getElementById('minimumTarget');
const durationInput      = document.getElementById('duration');
const requestCampaignBtn = document.getElementById('requestCampaign');
const proposalApproveBtn = document.getElementById('proposalApprove');
const proposalRejectBtn  = document.getElementById('proposalReject');

const input = {};

const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.type == 'checkbox' ? 
                        event.target.checked 
                        : 
                        event.target.value;
    input[name] = value;
    console.log(input);
};

const handleClick = (event) => {
    const type = event.target.id;
    switch (type) {
        case 'requestCampaign':
            requestCampaign();
            break;
        case 'proposalApprove':
            proposalApprove();
            break;
        case 'proposalReject':
            proposalReject();
            break;
        default:
            console.log("Out of context click");
            break;
    }
}

proposalNameInput.addEventListener('change',handleInput);
documentHashInput.addEventListener('change',handleInput);
maximumTargetInput.addEventListener('change',handleInput);
minimumTargetInput.addEventListener('change',handleInput);
durationInput.addEventListener('change',handleInput);
requestCampaignBtn.addEventListener('click', handleClick);
proposalApproveBtn.addEventListener('click', handleClick);
proposalRejectBtn.addEventListener('click', handleClick);
