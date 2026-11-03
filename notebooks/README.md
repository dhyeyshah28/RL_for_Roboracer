# Notebooks

The Colab links in `index.html` point at this directory through
`colab.research.google.com/github/<org>/<repo>/blob/main/notebooks/...`.
A Colab link only works once the notebook is pushed to the default branch of
a public repository.

Current layout (flat, one file per notebook):

```
notebooks/
  Mod1_LearnToDrive.ipynb          # Module 1: PPO from scratch
  export_ppo_onnx.py               # Module 1: export the trained policy to ONNX
  ppo_deploy_node.py               # Module 1: ROS 2 node that runs the ONNX policy on the car
  Mod2_LearnToRace.ipynb           # Module 2: reward shaping
  Mod2.1_StaticObsAvoidance.ipynb  # Module 2: static obstacle avoidance
  Mod2.2_DynamicObsAvoidance.ipynb # Module 2: dynamic obstacle avoidance
  Mod3.1_TrajOptimization.ipynb    # Module 3: trajectory optimization / learn to win
```

`export_ppo_onnx.py` and `ppo_deploy_node.py` are plain scripts, not
notebooks — the Materials section links to them as GitHub blob views rather
than through Colab.
