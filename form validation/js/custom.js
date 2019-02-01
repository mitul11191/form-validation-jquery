jQuery(document).ready(function ($) {
    var $loading = $('<div class="loading"><img src="./images/loading.gif" alt="" /></div>');

    var obj = {
        'firstName': '',
        'lastName': '',
        'UserName': '',
        'email': '',
        'addressOne': '',
        'addressSecound': '',
        'country': '',
        'state': '',
        'zip': '',
        'cardName': '',
        'creditCardNumber': '',
        'expiration': '',
        'cvv': '',
        'shippingAddress': [],
        'PaymentMethod': '',
        'Payment': ''
    }

    $(".required").each(function () {
        var defaultVal = $(this).attr('title');
        $(this).focus(function () {
            if ($(this).val() == defaultVal) {
                $(this).removeClass('active').val('');
            }
        });
        $(this).on('input', function (e) {
            if ($(this).val() !== '') {
                $(this).parents('.error').find('.text-danger').remove();
                $(this).parents('.error').removeClass('error')
            }
        });
        $(this).blur(function () {
            var inputVal = $(this).val();
            var $parentTag = $(this).parent();
            if (inputVal == '' && $(this).parent('div').find('.text-danger').length != '1') {
                var LableName = $(this).parent('div').find('label').text();
                $parentTag.addClass('error').append('<p class="text-danger">' + LableName + ' is Required </p>');
            }
        })
    });

    $('.btn-submit').click(function (e) {

        var $formId = $(this).parents('form');
        var formAction = $formId.attr('action');
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        $('div', $formId).removeClass('error');
        $('p.text-danger').remove();
        $('.required', $formId).each(function () {
            var inputVal = $(this).val();
            var $parentTag = $(this).parent();
            if (inputVal == '') {
                var LableName = $(this).parent('div').find('label').text();
                $parentTag.addClass('error').append('<p class="text-danger">' + LableName + ' is Required </p>');
            }

            if ($(this).attr('id') == 'email') {
                if (!emailReg.test(inputVal)) {
                    $parentTag.addClass('error').append('<p class="text-danger">Enter a valid email address.</p>');
                }
            }
        });
        if ($('p.text-danger').length == "0") {
            $formId.append($loading.clone());

            obj['firstName'] = $('#firstName').val();
            obj['lastName'] = $('#lastName').val();
            obj['UserName'] = $('#username').val();
            obj['email'] = $('#email').val();
            obj['addressOne'] = $('#address').val();
            obj['addressSecound'] = $('#address2').val();
            obj['country'] = $('#country').val();
            obj['state'] = $('#state').val();
            obj['zip'] = $('#zip').val();
            obj['cardName'] = $('#cc-name').val();
            obj['creditCardNumber'] = $('#cc-number').val();
            obj['expiration'] = $('#cc-expiration').val();
            obj['cvv'] = $('#cc-cvv').val();
            obj['payment'] = $("input[name='paymentMethod']:checked").val();

            obj['shippingAddress'] = [];
            $.each($("input[name='addressLocation']:checked"), function () {
                if (obj['shippingAddress'].indexOf($(this).val()) == -1) {
                    obj['shippingAddress'].push($(this).val());
                }
            });

            // $.post(formAction, $formId.serialize(), function (data) {
            //     console.log('data', data);
            //     $('.loading').remove();
            //     $formId.append(data).fadeIn();
            // });
        }
        e.preventDefault();
    });
});
