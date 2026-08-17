# Notebooks

The Colab links in `index.html` point at this directory through
`colab.research.google.com/github/<org>/<repo>/blob/main/notebooks/...`.

Expected layout, one subfolder per module:

```
notebooks/
  module1_learn_to_drive/
    lec1_part1_ppo_sb3/lec1_part1_ppo_sb3.ipynb        # practical PPO training with Stable-Baselines3
    lec1_ppo_from_scratch/lec1_ppo_from_scratch.ipynb  # actor-critic, rollout buffer, GAE, PPO update from scratch
  module2_learn_to_race/
    reward_shaping/reward_shaping.ipynb                # steering-smoothness & wall-proximity penalties, CTH reward
  module3_rl_for_everything/                            # add subfolders here once Module 3 ships
```

The physical-car deployment script referenced from Module 2 (`ppo_deploy_node.py`,
a ROS 2 node that runs a trained policy at 100 Hz) is not a notebook — it belongs
under a top-level `deployment/` directory, linked directly from GitHub rather than
through Colab.

A Colab link only works once the notebook is pushed to the default branch of a
public repository.
