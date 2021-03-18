package static

// Experimental experimental Traefik features.
type Experimental struct {
	KubernetesGateway bool                          `description:"Allow the Kubernetes gateway api provider usage." json:"kubernetesGateway,omitempty" toml:"kubernetesGateway,omitempty" yaml:"kubernetesGateway,omitempty" export:"true"`
	HTTP3             bool                          `description:"Enable HTTP3." json:"http3,omitempty" toml:"http3,omitempty" yaml:"http3,omitempty" export:"true"`
}
