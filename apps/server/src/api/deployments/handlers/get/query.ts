type GetDeploymentsQueryParams = {
  projectId: string;
  serviceId: string;
  deploymentCount: number;
};

export default ({
  projectId: _projectId,
  serviceId: _serviceId,
  deploymentCount,
}: GetDeploymentsQueryParams) =>
  `query deployments { deployments( first: ${deploymentCount}, input: { projectId: "${_projectId}" serviceId: "${_serviceId}" } ) { edges { node { id staticUrl status url updatedAt canRedeploy canRollback environmentId } } } }`;
