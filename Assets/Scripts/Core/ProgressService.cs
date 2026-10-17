using UnityEngine;

public static class ProgressService
{
    static string Key(string missionId) => $"steps_done_{missionId}";

    public static int GetStepsDone(string missionId) =>
        PlayerPrefs.GetInt(Key(missionId), 0);

    public static void SetStepsDone(string missionId, int stepsDone)
    {
        PlayerPrefs.SetInt(Key(missionId), Mathf.Max(0, stepsDone));
        PlayerPrefs.Save();
    }

    public static void Reset(string missionId) => SetStepsDone(missionId, 0);

    public static int GetPercent(MissionData mission)
    {
        if (mission.totalSteps <= 0) return 0;
        int done = Mathf.Clamp(GetStepsDone(mission.id), 0, mission.totalSteps);
        return Mathf.RoundToInt(100f * done / mission.totalSteps);
    }

    // Started but not finished: the popup will offer Continue
    public static bool HasProgress(MissionData mission)
    {
        int done = GetStepsDone(mission.id);
        return done > 0 && done < mission.totalSteps;
    }

    public static bool IsCompleted(MissionData mission) =>
        mission.totalSteps > 0 && GetStepsDone(mission.id) >= mission.totalSteps;
}