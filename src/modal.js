const $ = require('jquery');
window.$ = $;
require('bootstrap');

module.exports = (station, bars) => {
  const modalHtml = [
    '<div id="modal" class="modal fade" tabindex="-1" role="dialog">',
    '<div class="modal-dialog">',
    '<div class="modal-content">',
    '<div class="modal-header">',
    `<h4>Bars around ${station}</h4>`,
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
    '<span aria-hidden="true">&times;</span></button>',
    '</div>',
    '<div class="modal-body">',
    bars.length === 0 ? 'No bars in the area' : bars.map(bar => [
      '<p>',
      `<strong>${bar.name}</strong>`,
      (bar.street && bar.housenumber) && `<br>${bar.street} ${bar.housenumber}`,
      (bar.website) && `<br><a href="${bar.website}">${bar.website}</a>`,
      '</p>',
    ].join(' ')).join(''),
    '</div>',
    '<div class="modal-footer">',
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
    '</div></div></div></div>',
  ].join(' ');
  $('body').append(modalHtml);
  $("#modal").modal();
  $("#modal").modal('show');
  $('#modal').on('hidden.bs.modal', () => {
    $('#modal').remove();
  });
};
