using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class MissionGroup : MonoBehaviour
{
    [SerializeField] Image icon;
    [SerializeField] TMP_Text title;
    [SerializeField] Transform subLevelContainer;

    public Transform SubLevelContainer => subLevelContainer;

    public void SetHeader(MissionData mission)
    {
        title.text = mission.title;
        icon.sprite = mission.icon;
        icon.enabled = mission.icon != null;
    }
}