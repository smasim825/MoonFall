using System;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class MissionBuilding : MonoBehaviour
{
    public static event Action<Sprite, MissionData[]> Clicked;   // changed

    [SerializeField] MissionData[] missions;   // changed: 1 mission, or 2 for the ISRU building

    void Awake()
    {
        GetComponent<Button>().onClick.AddListener(OnClick);

        var img = GetComponent<Image>();
        if (img != null) img.alphaHitTestMinimumThreshold = 0.1f;
    }

    void OnClick()   // changed
    {
        if (missions == null || missions.Length == 0) return;
        Clicked?.Invoke(GetComponent<Image>().sprite, missions);
    }
}