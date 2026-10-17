using System;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class MissionBuilding : MonoBehaviour
{
    public static event Action<MissionData> Clicked;

    [SerializeField] MissionData mission;

    void Awake()
    {
        GetComponent<Button>().onClick.AddListener(OnClick);

        // Only clicks on visible pixels count (needs Read/Write on the sprite)
        var img = GetComponent<Image>();
        if (img != null) img.alphaHitTestMinimumThreshold = 0.1f;
    }

    void OnClick()
    {
        if (mission == null) return;
        Debug.Log($"Clicked {mission.title}");   // remove in Step 5
        Clicked?.Invoke(mission);
    }
}