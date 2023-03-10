package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stylebox.entity.stylist.Displays;
import com.stylebox.entity.stylist.Orders;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "StylistInformation.Graph", attributeNodes = {
        @NamedAttributeNode("user"),
})
public class StylistInformation {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @OneToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "stylistInformation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FollowRecord> followRecords = new ArrayList<>();
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "followee_id", referencedColumnName = "id")
//    private List<FollowRecord> followRecords = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Displays> displays = new ArrayList<>();

    @Column(name = "follow_num")
    private int followNum = 0;

    @Column(name = "intro")
    private String intro;

    @Column(name = "rate")
    private String rate;

    @Column(name = "age")
    private Integer age;

    public void addDisplay(Displays display){
        if(!displays.contains(display)) {
            displays.add(display);
        }
    }

    public void deleteDisplay(Displays display){
        displays.remove(display);
    }

    public void addFollowRecord(FollowRecord followRecord){
        if(!followRecords.contains(followRecord)) {
            followRecords.add(followRecord);
            followRecord.setStylistInformation(this);
//            this.followNum++;
        }
        this.followNum = followRecords.size();
    }

    public void deleteFollowRecord(FollowRecord followRecord){
        if(followRecords.contains(followRecord)) {
            followRecords.remove(followRecord);
            followRecord.setStylistInformation(null);
//            this.followNum--;
        }
        this.followNum = followRecords.size();
    }

    @OneToMany(mappedBy = "stylist", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Orders> orderSet = new HashSet<>();
}