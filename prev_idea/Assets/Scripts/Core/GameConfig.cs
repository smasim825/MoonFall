using UnityEngine;

[CreateAssetMenu(menuName = "Game/Config")]
public class GameConfig : ScriptableObject
{
    [Tooltip("On = save and show mission progress. Off = missions always start fresh.")]
    public bool useProgress = false;
}