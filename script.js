function openUrl(url) {
    function getClassLoader() {
        const classLoader = {
            ActivityThread: Java.use("android.app.ActivityThread"),
            ActivityThread_ActivityClientRecord: Java.use("android.app.ActivityThread$ActivityClientRecord"),
            Intent: Java.use("android.content.Intent"),
            Uri: Java.use("android.net.Uri"),
            Context: Java.use("android.content.Context")
        }
        return classLoader;
    }
    
    function getMainActivity(classLoader) {
        const activityThread = classLoader.ActivityThread.currentActivityThread();
        const mActivities = activityThread.mActivities.value;
        const activityClientRecord = Java.cast(mActivities.valueAt(0), classLoader.ActivityThread_ActivityClientRecord);
        return activityClientRecord.activity.value;
    }
    
    const classLoader = getClassLoader();
    const context = Java.cast(getMainActivity(classLoader), classLoader.Context);

    const Intent = classLoader.Intent;
    const Uri = classLoader.Uri;


    const intent = Intent.$new(Intent.ACTION_VIEW.value);
    intent.setData(Uri.parse(url));
    context.startActivity(intent);
}
