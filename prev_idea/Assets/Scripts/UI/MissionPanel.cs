using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MissionPanel : MonoBehaviour
{
    [Header("Panel")]
    [SerializeField] GameObject panel;
    [SerializeField] Transform missionList;
    [SerializeField] Image buildingImage;
    [SerializeField] TMP_Text descriptionText;
    [SerializeField] Button playButton;
    [SerializeField] Button closeButton;

    [Header("Prefabs")]
    [SerializeField] MissionGroup missionGroupPrefab;
    [SerializeField] SubLevelButton subLevelButtonPrefab;

    readonly List<SubLevelButton> buttons = new List<SubLevelButton>();
    SubLevelButton selected;

    void Awake()
    {
        playButton.onClick.AddListener(Play);
        closeButton.onClick.AddListener(Close);
        panel.SetActive(false);
    }

    void OnEnable() => MissionBuilding.Clicked += Open;
    void OnDisable() => MissionBuilding.Clicked -= Open;

    void Open(Sprite buildingSprite, MissionData[] missions)
    {
        panel.SetActive(true);   // must be active before creating the buttons
        Clear();
        buildingImage.sprite = buildingSprite;

        foreach (var mission in missions)
        {
            var group = Instantiate(missionGroupPrefab, missionList);
            group.SetHeader(mission);

            for (int i = 0; i < mission.subLevels.Length; i++)
            {
                var button = Instantiate(subLevelButtonPrefab, group.SubLevelContainer);
                button.Setup(this, mission, i);
                buttons.Add(button);
            }
        }

        if (buttons.Count > 0) Select(buttons[0]);
    }

    public void Select(SubLevelButton button)
    {
        selected = button;
        foreach (var b in buttons) b.SetSelected(b == button);
        ShowDescription(button);
    }

    public void Preview(SubLevelButton button) => ShowDescription(button);
    public void EndPreview() => ShowDescription(selected);

    void ShowDescription(SubLevelButton button)
    {
        descriptionText.text = button == null
            ? ""
            : button.Mission.subLevels[button.Index].description;
    }

    void Play()
    {
        if (selected == null) return;
        MissionSession.Mission = selected.Mission;
        MissionSession.SubLevelIndex = selected.Index;
        SceneManager.LoadScene(selected.Mission.sceneName);
    }

    void Close()
    {
        Clear();
        panel.SetActive(false);
    }

    void Clear()
    {
        foreach (Transform child in missionList) Destroy(child.gameObject);
        buttons.Clear();
        selected = null;
    }
}