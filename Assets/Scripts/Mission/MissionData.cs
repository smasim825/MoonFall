using UnityEngine;

[CreateAssetMenu(menuName = "Game/Mission")]
public class MissionData : ScriptableObject
{
    public string id;                       // unique, no spaces (used as the save key)
    public string title;
    [TextArea(3, 8)] public string description;   // instructions shown in the popup
    public string sceneName;                // must match the scene name exactly
    public int totalSteps;                  // number of steps in this mission
}