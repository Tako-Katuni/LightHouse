package POJO;

public class OfferCard {

    private final String title;
    private final String duration;


    public OfferCard(String title, String duration) {
        this.title = title;
        this.duration = duration;
    }

    public String getTitle() {
        return title;
    }
    public String getDuration() {
        return duration;
    }

    @Override
    public String toString() {
        return "OfferCard{" +
                "title='" + title + '\'' +
                ", Duration='" + duration + '\'' +
                '}';
    }



}
