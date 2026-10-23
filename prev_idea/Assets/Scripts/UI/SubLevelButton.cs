using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class SubLevelButton : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    [SerializeField] Sprite normalSprite;
    [SerializeField] Sprite selectedSprite;
    [SerializeField] Color normalTextColor = Color.white;
    [SerializeField] Color selectedTextColor = new Color32(20, 20, 20, 255);

    MissionPanel panel;
    Image background;
    TMP_Text label;

    public MissionData Mission { get; private set; }
    public int Index { get; private set; }

    public void Setup(MissionPanel owner, MissionData mission, int index)
    {
        panel = owner;
        Mission = mission;
        Index = index;

        background = GetComponent<Image>();
        label = GetComponentInChildren<TMP_Text>();
        label.text = mission.subLevels[index].title;

        GetComponent<Button>().onClick.AddListener(() => panel.Select(this));
        SetSelected(false);
    }

    public void SetSelected(bool selected)
    {
        background.sprite = selected ? selectedSprite : normalSprite;
        label.color = selected ? selectedTextColor : normalTextColor;
    }

    public void OnPointerEnter(PointerEventData eventData) => panel.Preview(this);
    public void OnPointerExit(PointerEventData eventData) => panel.EndPreview();
}