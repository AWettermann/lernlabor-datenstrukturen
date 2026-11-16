'use strict';
// Independently written equivalent variants; this file is test data, never an answer whitelist.
module.exports={
  nodeclass:`public class Knoten {
    private Paket inhalt;
    private Knoten folge;
    public Knoten(Paket daten) { inhalt=daten; }
    public Paket getPaket() { Paket ergebnis=inhalt; return ergebnis; }
    public Knoten getNaechster() { return folge; }
    public void setNaechster(Knoten ziel) { if(folge!=ziel) folge=ziel; }
  }`,
  stackclass:`public class PaketStapel {
    private Knoten spitze;
    public void push(Paket daten) { Knoten alt=spitze; spitze=new Knoten(daten); spitze.setNaechster(alt); }
    public Paket pop() { Knoten alt=spitze; if(alt==null)return null; spitze=alt.getNaechster(); return alt.getPaket(); }
    public Paket peek() { return spitze==null ? null : spitze.getPaket(); }
    public boolean isEmpty() { return !(spitze!=null); }
  }`,
  queueclass:`public class PaketWarteschlange {
    private Knoten anfang, ende;
    public void enqueue(Paket daten) { Knoten n=new Knoten(daten); if(ende==null) anfang=n; else ende.setNaechster(n); ende=n; }
    public Paket dequeue() { if(anfang!=null) { Paket daten=anfang.getPaket(); anfang=anfang.getNaechster(); if(anfang==null) ende=null; return daten; } return null; }
    public Paket front() { return anfang==null ? null : anfang.getPaket(); }
    public boolean isEmpty() { return anfang==null; }
  }`,
  treenode:`public class BaumKnoten {
    private Paket daten;
    private BaumKnoten l,r;
    public BaumKnoten(Paket wert) { daten=wert; }
    public BaumKnoten getLinks() { BaumKnoten kind=l; return kind; }
    public BaumKnoten getRechts() { return r; }
  }`,
  triesearch:`public boolean suchen(String nummer) {
    int stelle=0; Knoten lauf=wurzel;
    while(stelle<nummer.length()) {
      if(lauf instanceof InnererKnoten) { InnererKnoten innen=(InnererKnoten)lauf; lauf=innen.getKind(nummer.charAt(stelle)-'0'); }
      else return false;
      stelle++;
    }
    return lauf instanceof Blatt;
  }`,
  trieinsert:`private Knoten einfuegen(Knoten teil,String nummer,int index) {
    if(index<nummer.length()) {
      InnererKnoten ast=null;
      if(teil==null) ast=new InnererKnoten(); else ast=(InnererKnoten)teil;
      int z=nummer.charAt(index)-'0';
      ast.setKind(z,einfuegen(ast.getKind(z),nummer,index+1));
      return ast;
    }
    return new Blatt(nummer);
  }`,
  prefix:`public Knoten findePraefix(String text) { return folge(wurzel,text,0); }
    private Knoten folge(Knoten k,String text,int i) {
      if(i==text.length()) return k;
      if(!(k instanceof InnererKnoten)) return null;
      return folge(((InnererKnoten)k).getKind(text.charAt(i)-'0'),text,i+1);
    }`,
  traverse:`public int anzahlPakete() { int n=0; for (Knoten lauf=erster; lauf!=null; lauf=lauf.getNaechster()) n++; return n; }
    public double gesamtGewicht() { double total=0; for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) total=total+lauf.getPaket().getGewicht(); return total; }
    public int zaehlePaketeNach(String ort) { int n=0; for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) if(ort.equals(lauf.getPaket().getZielort())) n++; return n; }
    public Paket suchePaket(String nummer) { for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) if(nummer.equals(lauf.getPaket().getPaketnummer())) return lauf.getPaket(); return null; }`,
  insertAfter:`if(aktuell!=null) { Knoten rest=aktuell.getNaechster(); aktuell.setNaechster(new Knoten(paket)); aktuell.getNaechster().setNaechster(rest); }`,
  insertFront:`Knoten alt=erster; erster=new Knoten(paket); erster.setNaechster(alt);`,
  deleteFirst:`if(erster!=null) { erster=erster.getNaechster(); return true; } else { return false; }`,
  deleteSearch:`public boolean loeschePaket(String nummer) { if(erster==null) return false; if(nummer.equals(erster.getPaket().getPaketnummer())) { erster=erster.getNaechster(); return true; } Knoten vor=erster; while(vor.getNaechster()!=null) { Knoten kandidat=vor.getNaechster(); if(nummer.equals(kandidat.getPaket().getPaketnummer())) { vor.setNaechster(kandidat.getNaechster()); return true; } vor=kandidat; } return false; }`,
  updatePayload:`public boolean aktualisiereStatus(String nr,String status) { for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) { Paket p=lauf.getPaket(); if(nr.equals(p.getPaketnummer())) { p.setStatus(status); return true; } } return false; }`,
  sortedInsert:`Knoten neuer=new Knoten(paket); Knoten vor=null; Knoten lauf=erster; while(lauf!=null && lauf.getPaket().getGewicht()<=paket.getGewicht()) { vor=lauf; lauf=lauf.getNaechster(); } neuer.setNaechster(lauf); if(vor==null) erster=neuer; else vor.setNaechster(neuer);`,
  insertBetween:`Knoten rest=aktuell.getNaechster(); aktuell.setNaechster(neu); neu.setNaechster(rest);`,
  frontFragment:`Knoten alt=erster; erster=neu; neu.setNaechster(alt);`,
  removeFragment:`Knoten zweiter=erster.getNaechster(); erster=zweiter;`,
  push:`Knoten alt=oben; oben=new Knoten(paket); oben.setNaechster(alt);`,
  pop:`Knoten alt=oben; if(alt==null) return null; oben=alt.getNaechster(); return alt.getPaket();`,
  pushFragment:`Knoten alt=oben; oben=neu; neu.setNaechster(alt);`,
  popGuard:`if(null == oben) { return null; }`,
  enqueue:`Knoten neuer=new Knoten(paket); if(hinten!=null) hinten.setNaechster(neuer); else vorne=neuer; hinten=neuer;`,
  dequeue:`Knoten alt=vorne; if(alt==null)return null; vorne=alt.getNaechster(); if(vorne==null)hinten=null; return alt.getPaket();`,
  bug:`if(vorne!=null) { Paket daten=vorne.getPaket(); vorne=vorne.getNaechster(); if(vorne==null)hinten=null; return daten; } return null;`,
  queueTail:`if(vorne==null) { hinten=null; }`,
  treecount:`if(k==null) return 0; int rechts=anzahlKnoten(k.getRechts()); int links=anzahlKnoten(k.getLinks()); return rechts+links+1;`,
  leaves:`if (k == null) {
    return 0;
  }
  if (k.getLinks() == null && k.getRechts() == null) {
    return 1;
  }
  return anzahlBlaetter(k.getLinks())
       + anzahlBlaetter(k.getRechts());`,
  height:`if (k == null) {
    return 0;
  }
  int links = hoehe(k.getLinks());
  int rechts = hoehe(k.getRechts());
  return 1 + Math.max(links, rechts);`,
  weight:`if(k!=null) { double r=gesamtgewicht(k.getRechts()); double l=gesamtgewicht(k.getLinks()); return r+l+k.getPaket().getGewicht(); } return 0;`,
  inorder:`if(k!=null) { inorder(k.getLinks()); verarbeiten(k); inorder(k.getRechts()); }`,
  preorder:`if(k!=null) { verarbeiten(k); preorder(k.getLinks()); preorder(k.getRechts()); }`,
  postorder:`if(k!=null) { postorder(k.getLinks()); postorder(k.getRechts()); verarbeiten(k); }`,
  bstsearch:`while(k!=null) { if(k.getNummer()==nummer)return k.getPaket(); if(k.getNummer()>nummer) k=k.getLinks(); else k=k.getRechts(); } return null;`,
  bstinsert:`if(k!=null) { if(paket.getNummer()>=k.getNummer()) k.setRechts(einfuegen(k.getRechts(),paket)); else k.setLinks(einfuegen(k.getLinks(),paket)); return k; } return new BaumKnoten(paket);`,
  minimum:`if(k.getLinks()==null) return k; else return minimum(k.getLinks());`,
  bstdelete:`public BaumKnoten loeschen(BaumKnoten knoten,int ziel) {
    if(knoten==null)return null;
    if(ziel>knoten.getNummer()) knoten.setRechts(loeschen(knoten.getRechts(),ziel));
    else if(ziel<knoten.getNummer()) knoten.setLinks(loeschen(knoten.getLinks(),ziel));
    else { if(knoten.getRechts()==null)return knoten.getLinks(); if(knoten.getLinks()==null)return knoten.getRechts(); BaumKnoten ersatz=maximum(knoten.getLinks()); knoten.setPaket(ersatz.getPaket()); knoten.setLinks(loeschen(knoten.getLinks(),ersatz.getNummer())); } return knoten;
  }
  private BaumKnoten maximum(BaumKnoten x) { if(x.getRechts()==null)return x; return maximum(x.getRechts()); }`,
  deleteLeaf:`BaumKnoten leer=null; k30.setLinks(leer);`,
  deleteChild:`BaumKnoten kind=k70.getLinks(); k50.setRechts(kind);`,
  choose:`if(anforderung.equals("INDEXZUGRIFF"))return "Array"; else if(anforderung.equals("SCHLUESSELSUCHE"))return "Suchbaum"; else if(anforderung.equals("FIFO"))return "Queue"; else if(anforderung.equals("UNDO"))return "Stack"; else if(anforderung.equals("PRAEFIX"))return "Trie"; else return "unbekannt";`
};
