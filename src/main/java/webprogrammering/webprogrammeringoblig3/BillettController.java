package webprogrammering.webprogrammeringoblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {
@Autowired
private BillettRepository rep;

 @PostMapping("/lagre")
 public void lagreBillett(Billett innBilletter){rep.lagreBillet(innBilletter);};

 @GetMapping("/fikkAlle")
 public List<Billett> hentAlle() { return rep.hentAlleBilletter(); };

 @PostMapping("/slettAlle")
 public void slettAlle(){ rep.slettAlleBilleter();};
}
