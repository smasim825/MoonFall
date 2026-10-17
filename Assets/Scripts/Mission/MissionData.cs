using UnityEngine;

[CreateAssetMenu(menuName = "Game/Mission")]
public class MissionData : ScriptableObject
{
    public string id;               // unique, no spaces
    public string title;            // header text, e.g. "Mission 1: Power and Energy"
    public Sprite icon;             // icon next to the title in the panel
    public string sceneName;        // must match the scene name exactly
    public SubLevelData[] subLevels;

    [Header("Only used when progress is turned on in GameConfig")]
    public int totalSteps;
}