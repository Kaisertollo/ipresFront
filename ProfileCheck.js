const YEAR = new Date().getFullYear();
function fillTable(data)
{
  $(document).ready(function() 
  {
    $('#example1').DataTable( 
    {
      data:data,
      columns: [{ title: "Nom Entreprise" },{ title: "caisseID" },{ title: "ipresID" },]
    });
});
}



function cleanTable()
{
  var table = $('#example1').DataTable();
  table.destroy();
}


function getDonnees(id)
{
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost/ipres/view/indexIpres.php?view=donnee&id='+id, false);  
  request.send();
  return JSON.parse(request.responseText);
}


function isActif(id)
{
    let data = getDonnees(id);
    for (let index = YEAR; index > YEAR-5; index --) 
    {
      let donnee = data.find(element =>
      {
        return element.annee ==index;
      })
      if( donnee !== undefined)
      {
        if(index >YEAR - 3 && donnee.encReel >0)
          return setProfil(id,"actif");
        else if(donnee.encReel >0)
          return setProfil(id,"semi-Actif");
      }
    }
    return setProfil(id,"inacif");
    
}
function getEmployeur(agenceV)
{
  var request = new XMLHttpRequest();
  let data;
  request.onload = function() 
  {
    data = JSON.parse(this.responseText);
    /* data.forEach(element =>
      {
        console.log(element);
        isActif(element.id);
      }) */
    fillTable(data);
  };
  request.open('GET', 'http://localhost/ipres/view/indexIpres.php?view=selection&adresse='+agenceV, true);  
  request.send();
}
function setProfil(id,profil)
{
  var request = new XMLHttpRequest();
  request.open('GET',"http://localhost/ipres/view/setProfil.php?id="+id+"&profil="+profil, true);  
  request.send();
}