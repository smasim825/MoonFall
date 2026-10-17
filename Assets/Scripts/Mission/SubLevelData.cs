using System;
using UnityEngine;

[Serializable]
public class SubLevelData
{
    public string title;                          // e.g. "Balance the Grid"
    [TextArea(2, 4)] public string description;   // Astro Bee text shown in the panel
}